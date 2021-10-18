import React from 'react';
import Switch from '@mui/material/Switch';
import CommonField from './common-field';
import attach from '../attach';
import FormControlLabel from '@mui/material/FormControlLabel';
import DisplayValueTypography from './display-value-typography';

class BooleanField extends React.PureComponent {
  handleChange = (event) => {
    this.props.component.setValue(event.target.checked);
  };

  render() {
    const { value, disabled, component, editable, useDisplayValue, label } =
      this.props;

    let hideLabelUI = null;

    let fld = null;
    if (editable && !useDisplayValue) {
      hideLabelUI = true;
      fld = (
        <FormControlLabel
          control={
            <Switch
              checked={value ? value : false}
              onChange={this.handleChange}
              value="true"
              disabled={disabled}
            />
          }
          label={label}
        />
      );
    } else {
      fld = (
        <DisplayValueTypography>
          {component.getDisplayValue()}
        </DisplayValueTypography>
      );
    }

    return (
      <CommonField component={component} hideLabelUI={hideLabelUI}>
        {fld}
      </CommonField>
    );
  }
}

export default attach([
  'value',
  'err',
  'disabled',
  'editable',
  'useDisplayValue',
  'label',
])(BooleanField);
