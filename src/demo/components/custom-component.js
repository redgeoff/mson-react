import React from 'react';
import attach from '../../attach';
import Typography from '@material-ui/core/Typography';

import UIComponent from 'mson/lib/ui-component';
import Form from 'mson/lib/form';
import TextField from 'mson/lib/fields/text-field';

class CustomComponent extends UIComponent {
  className = 'CustomComponent';

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

// Or, you can use MSON instead of JS
//
// import compiler from 'mson/lib/compiler';
//
// const CustomComponent = compiler.compile({
//   component: 'UIComponent',
//   name: 'CustomComponent',
//   schema: {
//     component: 'Form',
//     fields: [
//       {
//         component: 'TextField',
//         name: 'name'
//       },
//       {
//         component: 'TextField',
//         name: 'label'
//       }
//     ]
//   }
// });

let CustomComponentUI = (props) => {
  const { name, label } = props;
  return (
    <div>
      <Typography variant="h3">Name: {name}</Typography>
      <Typography variant="h4">Label: {label}</Typography>
    </div>
  );
};

// Bind React props to MSON component props
CustomComponentUI = attach(['name', 'label'])(CustomComponentUI);

export { CustomComponent, CustomComponentUI };
