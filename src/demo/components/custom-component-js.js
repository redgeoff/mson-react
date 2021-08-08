import React from 'react';
import attach from '../../attach';
import Typography from '@material-ui/core/Typography';

import UIComponent from 'mson/lib/ui-component';
import Form from 'mson/lib/form';
import TextField from 'mson/lib/fields/text-field';

class CustomComponentJS extends UIComponent {
  // className is needed as JS minification strips the constructor name
  className = 'CustomComponentJS';

  create(props) {
    super.create(props);

    this.set({
      schema: new Form({
        fields: [
          new TextField({
            name: 'name',
          }),
          new TextField({
            name: 'label',
          }),
        ],
      }),
    });
  }
}

let CustomComponentJSUI = (props) => {
  const { name, label } = props;
  return (
    <div>
      <Typography variant="h3">Name: {name}</Typography>
      <Typography variant="h4">Label: {label}</Typography>
    </div>
  );
};

// Bind React props to MSON component props
CustomComponentJSUI = attach(['name', 'label'])(CustomComponentJSUI);

export { CustomComponentJS, CustomComponentJSUI };
