import compiler from 'mson/lib/compiler';
import components from './components';
import globals from 'mson/lib/globals';
import uiComponents from '../components';
import FieldEditorForm from 'mson/lib/form/field-editor-form';
import FieldEditorFormUI from '../field-editor-form';
import FormEditor from 'mson/lib/form/form-editor';
import FormEditorUI from '../form-editor';
import FormBuilder from 'mson/lib/form/form-builder';

import {
  CustomComponent,
  ReactCustomComponent,
} from './components/custom-component';
import {
  CustomComponentJS,
  ReactCustomComponentJS,
} from './components/custom-component-js';
import {
  CustomComponentNoProps,
  ReactCustomComponentNoProps,
} from './components/custom-component-no-props';

// Set the site key when using the ReCAPTCHAField
globals.set({ reCAPTCHASiteKey: '6LdIbGMUAAAAAJnipR9t-SnWzCbn0ZX2myXBIauh' });

// Register optional core components
compiler.registerComponent('FieldEditorForm', FieldEditorForm);
uiComponents.FieldEditorForm = FieldEditorFormUI;
compiler.registerComponent('FormEditor', FormEditor);
uiComponents.FormEditor = FormEditorUI;
compiler.registerComponent('FormBuilder', FormBuilder);

// Register any custom components written in JS and not MSON
compiler.registerComponent('CustomComponent', CustomComponent);
uiComponents.CustomComponent = ReactCustomComponent;
compiler.registerComponent('CustomComponentJS', CustomComponentJS);
uiComponents.CustomComponentJS = ReactCustomComponentJS;
compiler.registerComponent('CustomComponentNoProps', CustomComponentNoProps);
uiComponents.CustomComponentNoProps = ReactCustomComponentNoProps;

// Register all the components
for (let name in components) {
  let component = components[name];
  compiler.registerComponent(component.name, component);
}

// Instantiate the app
const app = compiler.newComponent({
  component: 'app.App',
});

export default app;
