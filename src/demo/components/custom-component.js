import React from 'react';
import useComponent from '../../use-component';
import Typography from '@mui/material/Typography';
import compile from 'mson/lib/compiler/compile';

const CustomComponent = compile({
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

const ReactCustomComponent = (props) => {
  const { name, label } = useComponent(props.component, ['name', 'label']);
  return (
    <div>
      <Typography variant="h3">Name: {name}</Typography>
      <Typography variant="h4">Label: {label}</Typography>
    </div>
  );
};

export { CustomComponent, ReactCustomComponent };
