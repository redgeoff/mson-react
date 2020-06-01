import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from './icon';
import classNames from 'classnames';

// TODO: see https://material-ui-next.com/style/icons/#icons and implement:
// 1. Mouseover to change background color

const styles = (theme) => ({
  textField: {
    width: '100%',
  },

  textFieldInput: {
    borderRadius: 3,
    backgroundColor: theme.palette.primary[400],
    fontSize: theme.typography.subtitle1.fontSize,
    padding: '10px 34px 10px 34px',
    marginTop: '2px',
    width: 'calc(100%)',
    color: theme.palette.common.white,
  },

  // Needed so that relative components don't take up any space
  iconContainer: {
    position: 'relative',
    width: '100%', // Set 100% so that we can position the close icon relative to this
    height: '0px',
  },

  searchIcon: {
    position: 'absolute',
    top: '-31px',
    left: '6px',
  },

  closeIcon: {
    position: 'absolute',
    top: '-43px',
    right: '-5px',
  },

  grow: {
    flexGrow: 1,
  },
});

class SearchBar extends React.PureComponent {
  state = { autoFullWidth: false };

  handleKeyUp = (event) => {
    // Enter pressed?
    if (event.keyCode === 13) {
      this.props.onSearch(this.props.searchString);
    }
  };

  handleClearSearch = (event) => {
    this.props.onSearch('');
  };

  handleFocus = () => {
    this.setState({ autoFullWidth: true });
  };

  handleBlur = () => {
    this.setState({ autoFullWidth: false });
  };

  render() {
    const {
      classes,
      className,
      searchString,
      onChange,
      fullWidth,
    } = this.props;

    const { autoFullWidth } = this.state;

    const full = fullWidth || autoFullWidth;

    return (
      <div className={classNames(className, full ? classes.grow : null)}>
        <TextField
          InputProps={{
            disableUnderline: true,
            classes: {
              input: classes.textFieldInput,
            },
          }}
          value={searchString}
          onKeyUp={this.handleKeyUp}
          onChange={(event) => onChange(event.target.value)}
          className={classes.textField}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <div className={classes.iconContainer}>
          <Icon icon="Search" className={classes.searchIcon} />
          <IconButton
            color="inherit"
            aria-label="clear search"
            onClick={this.handleClearSearch}
            className={classes.closeIcon}
          >
            <Icon icon="Close" />
          </IconButton>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

SearchBar = withStyles(styles)(SearchBar);

export default SearchBar;
