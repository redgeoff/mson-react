import React from 'react';
import attach from '../../attach';
import Typography from '@material-ui/core/Typography';

import UIComponent from 'mson/lib/ui-component';
import Form from 'mson/lib/form';
import TextField from 'mson/lib/fields/text-field';

class CustomComponentJS extends UIComponent {
  constructor(props) {
    super({
      // name is needed as JS minification strips the constructor name
      name: 'CustomComponentJS',

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

      ...props,
    });
  }
}

let ReactCustomComponentJS = (props) => {
  const { name, label } = props;
  return (
    <div>
      <Typography variant="h3">Name: {name}</Typography>
      <Typography variant="h4">Label: {label}</Typography>
    </div>
  );
};

// Bind React props to MSON component props
ReactCustomComponentJS = attach(['name', 'label'])(ReactCustomComponentJS);

export { CustomComponentJS, ReactCustomComponentJS };
