import React from 'react';
import Form from './form';
import Component from './component';
import attach from './attach';

class FormEditor extends React.Component {
  render() {
    const { editable, component } = this.props;
    if (editable !== false) {
      return <Form {...this.props} />;
    } else {
      // Note: we need to use a getter to generate the definition
      const definition = component.get('definition');

      // Needed as form tag cannot be a descendant of a form tag
      const formTag = false;

      return <Component definition={definition} formTag={formTag} />;
    }
  }
}

FormEditor = attach(['editable'])(FormEditor);

export default FormEditor;
