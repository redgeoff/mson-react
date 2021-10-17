import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Menu from './menu';
import { Switch, Route } from 'react-router-dom';
import Component from './component';
import ComponentMSON from 'mson/lib/component';
import { withRouter } from 'react-router';
import attach from './attach';
import globals from 'mson/lib/globals';
import Snackbar from './snackbar';
import ConfirmationDialog from './confirmation-dialog';
import Action from 'mson/lib/actions/action';
import CollectionField from 'mson/lib/fields/collection-field';
import Form from 'mson/lib/form';
import access from 'mson/lib/access';
import registrar from 'mson/lib/compiler/registrar';
import AppBar, { DRAWER_WIDTH } from './app-bar';

const styles = (theme) => ({
  root: {
    width: '100%',
    // height: 430,
    // marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing(3),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },

    // Disable Chrome's Scroll Anchoring as it causes problems with infinite scrolling when
    // scrolling up. Specifically, the scroll location is locked after items are prepended to the
    // top of the list before the spacer is resized.
    overflowAnchor: 'none',
  },
  contentResponsive: {
    // Also needed to extend menu vertically
    [theme.breakpoints.up('md')]: {
      marginLeft: DRAWER_WIDTH,
    },
  },
});

// TODO: use React Hooks
class App extends React.PureComponent {
  state = {
    mobileOpen: false,
    menuItem: null,
    snackbarOpen: false,
    snackbarMessage: '',
    confirmationOpen: false,
    nextMenuItem: null,
    showArchivedToggle: false,

    // Note: we need both searchStringInput and globals.searchString as searchStringInput is the
    // controlled value for the text input and globals.searchString is the actual string with which
    // we are searching. These values not the same as we expect the user to submit the search before
    // it is performed so that we don't search on every keystroke. FUTURE: wait a little bit after
    // characters have been entered and then automatically search.
    searchStringInput: '',
    showSearch: false,

    showSearchOnMobile: false,

    // isLoggedIn: false
  };

  form = null;

  path = null;

  constructor(props) {
    super(props);
    this.setGlobalOnNavigate();
  }

  onNavigate = (callback) => {
    // We don't warn about discarding changes when fullScreen, e.g. a login page
    const menuItem = this.state.menuItem;
    if (
      menuItem &&
      menuItem.producedContent.has('dirty') &&
      menuItem.producedContent.get('dirty') &&
      !menuItem.fullScreen
    ) {
      // Show a confirmation dialog to see if the user wants to continue
      globals.displayConfirmation({
        title: 'Discard changes?',
        callback,
      });
    } else {
      // Nothing is dirty so allow the navigation to continue
      callback(true);
    }
  };

  setGlobalOnNavigate() {
    globals.setOnNavigate(this.onNavigate);
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  redirect(path) {
    const { history } = this.props;

    // Clear the redirectPath so that back-to-back redirects to the same route are considered
    // unique, e.g. if / routes to /somepage and then the user hits back.
    globals.set({ redirectPath: null });

    history.push(path);
  }

  navigateTo(path) {
    const { component } = this.props;
    const menu = component.get('menu');
    const item = menu.getItemAndParsePath(path);
    return this.switchContent(item.item, item.params);
  }

  handleNavigate = async (menuItem) => {
    this.props.history.push(menuItem.path);
  };

  handleConfirmationClose = async (yes) => {
    const { confirmation } = this.props;
    if (confirmation.callback && yes) {
      // Allow/prohibit the route change
      confirmation.callback(yes);
    }
    this.setState({ confirmationOpen: false });
  };

  canArchive(currentComponent) {
    let canArchive = false;
    let canSearch = false;
    if (currentComponent && currentComponent instanceof Form) {
      for (const field of currentComponent.getFields()) {
        if (field instanceof CollectionField) {
          canArchive =
            !field.get('forbidViewArchived') &&
            access.canArchive(field.get('form'));
          canSearch = !field.get('forbidSearch');
        }
      }
    }
    return {
      canArchive,
      canSearch,
    };
  }

  emitLoggedOut() {
    globals.set({ redirectAfterLogin: this.props.location.pathname });
    this.props.component.emitLoggedOut();
  }

  requireAccess(roles) {
    const canAccess =
      !roles || (registrar.client && registrar.client.user.hasRole(roles));
    if (!canAccess) {
      this.emitLoggedOut();
    }
    return canAccess;
  }

  switchContent = async (menuItem, parameters) => {
    const { currentComponent } = this.state;

    // Prevent infinite recursion when menuItem is null by making sure that the menuItem is
    // changing before changing anything else; especially the state
    if (currentComponent) {
      // Emit an unload event so that the component can unload any data, etc...
      currentComponent.emitUnload();
    }

    // Note: menuItem can be null if there is no content on the landing page
    const content = menuItem && menuItem.content;

    if (content) {
      const { location, component } = this.props;
      const menu = component.get('menu');
      globals.set({
        route: menu.toRoute({
          parameters,
          queryString: location.search.substr(1),
          hash: location.hash.substr(1),
        }),
      });

      const parentItem = menu.getParent(menuItem.path);
      if (
        this.requireAccess(menuItem.roles) &&
        (!parentItem || this.requireAccess(parentItem.roles))
      ) {
        let producedContent = null;

        if (content instanceof Action) {
          // Execute the actions
          producedContent = await content.run({ component: content });
        } else {
          producedContent = content;
        }

        // producedContent can be null if content is an action, which doesn't generate a
        // component. And, producedContent can also be something other than a Component if content
        // is an action that returns a non-component
        if (producedContent && producedContent instanceof ComponentMSON) {
          // TODO: we are mutating the menuItem object directory. Would it be better to promote
          // the MenuItem to a component and set the producedContent there?
          menuItem.producedContent = producedContent;

          const newComponent = producedContent;

          // Emit a load event so that the component can load any initial data, etc...
          newComponent.emitLoad();

          const { canArchive, canSearch } = this.canArchive(newComponent);

          globals.set({ searchString: null });

          // Set showArchived to false whenever we change the route
          this.setState({
            menuItem,
            showArchived: false,
            showArchivedToggle: canArchive,
            searchStringInput: '',
            showSearch: canSearch,
            currentComponent: newComponent,
          });
        }
      }
    } else {
      this.setState({ currentComponent: null });
    }
  };

  onLocation = (location) => {
    globals.set({
      path: location.pathname,
      pathHash: location.hash,
      pathSearch: location.search,
    });
  };

  componentDidUpdate(prevProps) {
    const snackbarMessage = globals.get('snackbarMessage');
    if (snackbarMessage) {
      this.displaySnackbar(snackbarMessage);
      globals.set({ snackbarMessage: null });
    }

    if (
      this.props.redirectPath &&
      this.props.redirectPath !== prevProps.redirectPath
    ) {
      this.redirect(this.props.redirectPath);
    }

    if (
      this.props.path !== prevProps.path ||
      this.props.pathHash !== prevProps.pathHash ||
      this.props.pathSearch !== prevProps.pathSearch
    ) {
      this.navigateTo(this.props.path);
    }

    if (this.props.confirmation !== prevProps.confirmation) {
      // Show the popup if any of the confirmation info has changed
      this.setState({ confirmationOpen: true });
    }

    if (this.props.searchString !== prevProps.searchString) {
      // Pass search string down to current component
      const menuItem = this.state.menuItem;
      if (menuItem && menuItem.producedContent.has('searchString')) {
        menuItem.producedContent.set({
          searchString: this.props.searchString,
        });
      }
    }
  }

  componentDidMount() {
    // Allows us to listen to back and forward button clicks
    this.unlisten = this.props.history.listen(this.onLocation);

    if (registrar.client) {
      // Wait for the session to load before loading the initial component so that we can do things
      // like route based on a user's role
      registrar.client.user.awaitSession();
    }

    // Load the correct component based on the initial path
    this.onLocation(this.props.location);

    // TODO: is this too inefficient in that it cascades a lot of unecessary events? Instead, could:
    // 1. move more logic to app layer so that only cascade when need new window 2. use something
    // like a global scroll listener that the component can use when it is active
    window.addEventListener('scroll', (e) => {
      const { menuItem } = this.state;
      if (menuItem) {
        menuItem.producedContent.emit('scroll', e);
      }
    });

    // Handle immediate redirects, e.g. if user is not logged in
    if (this.props.redirectPath) {
      this.redirect(this.props.redirectPath);
    }
  }

  componentWillUnmount() {
    this.unlisten();
  }

  displaySnackbar(message) {
    this.setState({ snackbarOpen: true, snackbarMessage: message });
  }

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  handleArchivedChange = (event) => {
    this.setState({ showArchived: event.target.checked });

    const { menuItem } = this.state;

    if (menuItem) {
      menuItem.producedContent.set({ showArchived: event.target.checked });

      // Scroll to the top of the page as otherwise it is confusing to the user as to why they are
      // dumped in some random place within the newly queried data.
      window.scrollTo({
        top: 0,
      });
    }
  };

  handleSearchStringInputChange = (searchStringInput) => {
    this.setState({
      searchStringInput,
    });
  };

  handleSearch = (searchStringInput) => {
    this.setState(
      {
        searchStringInput,
      },
      () => {
        globals.set({
          searchString: searchStringInput ? searchStringInput : null,
        });
      }
    );
  };

  toggleShowSearch = () => {
    this.setState({ showSearchOnMobile: !this.state.showSearchOnMobile });
  };

  isResponsive() {
    return !this.props.menuAlwaysTemporary;
  }

  render() {
    const { classes, component, confirmation, location } = this.props;
    const {
      mobileOpen,
      menuItem,
      snackbarOpen,
      snackbarMessage,
      confirmationOpen,
      currentComponent,
      showSearchOnMobile,
      searchStringInput,
      showSearch,
      showArchived,
      showArchivedToggle,
    } = this.state;

    const responsive = this.isResponsive();

    const menu = component.get('menu');

    // Use the path from the location prop as this.state.path may not be up to date
    const path = location.pathname;

    const comp = currentComponent ? (
      <Component component={currentComponent} />
    ) : null;

    const title = menuItem?.label;

    const appBar = (
      <AppBar
        showSearchOnMobile={showSearchOnMobile}
        onToggleShowSearch={this.toggleShowSearch}
        showSearch={showSearch}
        searchString={searchStringInput}
        onSearchChange={this.handleSearchStringInputChange}
        onSearch={this.handleSearch}
        onMenuClick={this.handleDrawerToggle}
        responsive={responsive}
        title={title}
        showArchived={showArchived}
        showArchivedToggle={showArchivedToggle}
        onArchivedToggleChange={this.handleArchivedChange}
      />
    );

    const menuSidebar = (
      <Menu
        component={menu}
        onDrawerToggle={this.handleDrawerToggle}
        mobileOpen={mobileOpen}
        onNavigate={this.handleNavigate}
        path={path}
        responsive={responsive}
      />
    );

    let fullScreenStyle = null;
    if (menuItem && menuItem.fullScreen) {
      fullScreenStyle = {
        marginLeft: 0,
        marginTop: 0,
      };
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          {menuItem && menuItem.fullScreen ? null : appBar}
          {menuItem && menuItem.fullScreen ? null : menuSidebar}
          <main
            className={
              classes.content +
              (responsive ? ` ${classes.contentResponsive}` : '')
            }
            style={fullScreenStyle}
          >
            <Switch>
              {/* Omitting path so that all paths are matched */}
              <Route />
            </Switch>

            {comp}

            <Snackbar
              open={snackbarOpen}
              message={snackbarMessage}
              onClose={this.handleSnackbarClose}
            />
            <ConfirmationDialog
              open={confirmationOpen}
              onClose={this.handleConfirmationClose}
              title={confirmation ? confirmation.title : null}
              text={confirmation ? confirmation.text : null}
              alert={confirmation ? confirmation.alert : null}
            />
          </main>
        </div>
      </div>
    );
  }
}

App = withStyles(styles, { withTheme: true })(App);
App = withRouter(App);
App = attach(['menuAlwaysTemporary'])(App);
App = attach(
  [
    'path',
    'pathHash',
    'pathSearch',
    'redirectPath',
    'snackbarMessage',
    'confirmation',
    'searchString',
  ],
  globals
)(App);
export default App;
