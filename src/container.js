import React from 'react';
import useComponent from './use-component';
import Component from './component';

export default function Container(props) {
  const { content } = useComponent(props.component, ['content']);
  return <Component component={content} />;
}
