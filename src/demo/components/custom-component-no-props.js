import React from 'react';
import Typography from '@material-ui/core/Typography';
import compile from 'mson/lib/compiler/compile';

const ReactCustomComponentNoProps = (/* props */) => {
  const text = 'This text is private to the React component';
  return (
    <div>
      <Typography variant="h5">Text: {text}</Typography>
    </div>
  );
};

const CustomComponentNoProps = compile({
  component: 'UIComponent',
  name: 'CustomComponentNoProps',
  render: ReactCustomComponentNoProps,
});

export { CustomComponentNoProps };
