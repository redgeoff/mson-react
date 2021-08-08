import React from 'react';
import Typography from '@material-ui/core/Typography';
import { compile } from 'mson/lib';

const CustomComponentNoProps = compile({
  component: 'UIComponent',
  name: 'CustomComponentNoProps',
});

const ReactCustomComponentNoProps = (/* props */) => {
  const text = 'This text is private to the React component';
  return (
    <div>
      <Typography variant="h5">Text: {text}</Typography>
    </div>
  );
};

export { CustomComponentNoProps, ReactCustomComponentNoProps };
