import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Icon from './icon';
import registrar from 'mson/lib/compiler/registrar';
import utils from 'mson/lib/utils/utils';

const styles = (theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  primary: {
    color: theme.palette.text.primary,
  },
  secondary: {
    color: theme.palette.text.secondary,
  },
  selected: {
    fontWeight: 'bold',
  },
});

class Submenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: this.childSelected(),
    };
  }

  childSelected() {
    const { item, path } = this.props;

    let childSelected = false;

    utils.each(item.items, (item) => {
      if (path === item.path) {
        childSelected = true;
        return false; // exit loop
      }
    });

    return childSelected;
  }

  handleClick = (item) => {
    // Has sub items?
    if (item.items) {
      this.setState({ open: !this.state.open });
    } else {
      // Note: the navigation is handled by the parent as we want to be able to prevent the
      // navigation if say a form is dirty, etc...
      if (this.props.onNavigate) {
        this.props.onNavigate(item);
      }

      if (this.props.onDrawerToggle) {
        // Close the drawer
        this.props.onDrawerToggle();
      }
    }
  };

  items() {
    const { classes, item, path } = this.props;
    const listItems = [];
    item.items.forEach((item, index) => {
      const isSelected = path === item.path;
      let classNames = [classes.secondary];
      if (isSelected) {
        classNames.push(classes.selected);
      }

      if (
        (!item.roles ||
          (registrar.client && registrar.client.user.hasRole(item.roles))) &&
        item.hidden !== true
      ) {
        listItems.push(
          <ListItem
            button
            className={classes.nested}
            key={index}
            onClick={() => this.handleClick(item)}
          >
            <ListItemText
              disableTypography
              primary={
                <Typography variant="body2" className={classNames.join(' ')}>
                  {item.label}
                </Typography>
              }
            />
          </ListItem>
        );
      }
    });
    return listItems;
  }

  render() {
    const { item, classes, path } = this.props;
    const items = item.items ? this.items() : null;

    const isSelected = path === item.path;
    let classNames = [classes.primary];
    if (isSelected) {
      classNames.push(classes.selected);
    }

    let listItems = null;
    if (items) {
      listItems = (
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List disablePadding>{this.items()}</List>
        </Collapse>
      );
    }

    return (
      <div>
        <ListItem button onClick={() => this.handleClick(item)}>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="subtitle1" className={classNames.join(' ')}>
                {item.label}
              </Typography>
            }
          />
          {items ? (
            this.state.open ? (
              <Icon icon="ExpandLess" />
            ) : (
              <Icon icon="ExpandMore" />
            )
          ) : null}
        </ListItem>
        {listItems}
      </div>
    );
  }
}

export default withStyles(styles)(Submenu);
