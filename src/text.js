import React from 'react';
import useComponent from './use-component';
import ReactMarkdown from 'react-markdown';

export default function Text(props) {
  const { text } = useComponent(props.component, ['text']);

  // As per https://github.com/remarkjs/react-markdown/issues/42, `renderers={{paragraph: 'span'}}`
  // substitutes the p tag with a span so that there is no margin
  return <ReactMarkdown renderers={{ paragraph: 'span' }} source={text} />;
}
