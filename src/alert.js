import React from 'react';
import useComponent from './use-component';
import Component from './component';
import MuiAlert from '@material-ui/lab/Alert';

export default function Alert(props) {
  const { severity, content } = useComponent(props.component, [
    'severity',
    'content',
  ]);
  return (
    <MuiAlert severity={severity}>
      {content && <Component component={content} />}
    </MuiAlert>
  );
}
