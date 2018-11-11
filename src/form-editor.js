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
      const definition = {
        component: 'Form',
        fields: component.get('fields.fields').mapForms(form => ({
          ...form.getValues({ default: false }),
          componentName: undefined,
          component: form.getValue('componentName')
        }))
      };

      // Needed as form tag cannot be a descendant of a form tag
      const formTag = false;

      return <Component definition={definition} formTag={formTag} />;
    }
  }
}

FormEditor = attach(['editable'])(FormEditor);

export default FormEditor;
