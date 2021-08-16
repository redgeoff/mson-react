import React from 'react';
import attach from '../../attach';
import Typography from '@material-ui/core/Typography';
import compile from 'mson/lib/compiler/compile';

const CustomComponentAttach = compile({
  component: 'UIComponent',
  name: 'CustomComponent',
  schema: {
    component: 'Form',
    fields: [
      {
        component: 'TextField',
        name: 'name',
      },
      {
        component: 'TextField',
        name: 'label',
      },
    ],
  },
});

let ReactCustomComponentAttach = (props) => {
  const { name, label } = props;
  return (
    <div>
      <Typography variant="h3">Name: {name}</Typography>
      <Typography variant="h4">Label: {label}</Typography>
    </div>
  );
};

// Bind React props to MSON component props
ReactCustomComponentAttach = attach(['name', 'label'])(
  ReactCustomComponentAttach
);

export { CustomComponentAttach, ReactCustomComponentAttach };
