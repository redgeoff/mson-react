import React from 'react';
import UIComponent from 'mson/lib/ui-component';
import Form from 'mson/lib/form';
import TextField from 'mson/lib/fields/text-field';
import attach from '../../attach';
import Typography from '@material-ui/core/Typography';
// import MSONComponent from 'mson/lib/component/mson-component';

// class CustomComponent extends UIComponent {
//   _className = 'CustomComponent';

//   _create(props) {
//     super._create(props);

//     this.set({
//       schema: new Form({
//         fields: [
//           new TextField({
//             name: 'name',
//           }),
//           new TextField({
//             name: 'label',
//           }),
//         ],
//       }),
//     });
//   }
// }

// const CustomComponent = new MSONComponent({
//   name: 'CustomComponent',
//   schema: new Form({
//     fields: [
//       new TextField({
//         name: 'name',
//       }),
//       new TextField({
//         name: 'label',
//       }),
//     ],
//   })
// })

const CustomComponent = () => ({
  component: UIComponent,
  name: 'CustomComponent',
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
