import React from 'react';
import FormControlMU from '@mui/material/FormControl';
import withStyles from '@mui/styles/withStyles';

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  fullWidth: {
    // TODO: bug in material ui?
    width: `calc(100% - ${theme.spacing(2)})`,
  },
  noMarginBottom: {
    marginBottom: 0,
  },
});

class FormControl extends React.PureComponent {
  render() {
    const { fullWidth, children, classes, marginBottom } = this.props;

    const fullWidthClassName = fullWidth ? classes.fullWidth : '';
    const noMarginBottomClassName =
      marginBottom === false ? classes.noMarginBottom : '';

    return (
      <FormControlMU
        fullWidth={fullWidth}
        className={`${classes.formControl} ${fullWidthClassName} ${noMarginBottomClassName}`}
      >
        {children}
      </FormControlMU>
    );
  }
}

export default withStyles(styles)(FormControl);
