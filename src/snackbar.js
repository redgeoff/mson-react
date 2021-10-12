import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
// import Button from '@mui/material/Button';
import SnackbarMUI from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Icon from './icon';

const styles = (theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
});

class Snackbar extends React.PureComponent {
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const { classes, message, open } = this.props;
    return (
      <SnackbarMUI
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
          //   UNDO
          // </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
            size="large"
          >
            <Icon icon="Close" />
          </IconButton>,
        ]}
      />
    );
  }
}

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Snackbar);
