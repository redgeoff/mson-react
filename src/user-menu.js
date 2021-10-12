import React from 'react';
import IconButton from '@mui/material/IconButton';
import Icon from './icon';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default class UserDropDown extends React.PureComponent {
  state = {
    anchorEl: null,
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { isLoggedIn } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    if (!isLoggedIn) {
      return null;
    }

    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
          size="large"
        >
          <Icon icon="AccountCircle" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Log Out</MenuItem>
          <MenuItem onClick={this.handleClose}>Edit Account</MenuItem>
          <MenuItem onClick={this.handleClose}>Change Password</MenuItem>
        </Menu>
      </div>
    );
  }
}
