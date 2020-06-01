import React from 'react';
import attach from '../attach';
import ReCAPTCHA from 'react-google-recaptcha';
import withStyles from '@material-ui/core/styles/withStyles';
import globals from 'mson/lib/globals';

const styles = (theme) => ({
  captcha: {
    margin: theme.spacing(1),
  },
});

class ReCAPTCHAField extends React.PureComponent {
  handleChange = (value) => {
    this.props.component.setValue(value);
  };

  render() {
    const {
      disabled,
      editable,
      accessEditable,
      classes,
      useDisplayValue,
    } = this.props;

    const isEditable = accessEditable !== false && editable && !disabled;

    const siteKey = globals.get('reCAPTCHASiteKey');

    if (isEditable && !useDisplayValue) {
      return (
        <div className={classes.captcha}>
          <ReCAPTCHA
            ref="recaptcha"
            sitekey={siteKey}
            onChange={this.handleChange}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

ReCAPTCHAField = withStyles(styles)(ReCAPTCHAField);

export default attach(['disabled', 'editable', 'useDisplayValue'])(
  ReCAPTCHAField
);
