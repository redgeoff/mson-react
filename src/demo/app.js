import compiler from 'mson/lib/compiler';
import register from 'mson/lib/compiler/register';
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
import { CustomComponentNoProps } from './components/custom-component-no-props';
import { CustomComponentAttach } from './components/custom-component-attach';

// Set the site key when using the ReCAPTCHAField
globals.set({ reCAPTCHASiteKey: '6LdIbGMUAAAAAJnipR9t-SnWzCbn0ZX2myXBIauh' });

// Register optional core components
register('FieldEditorForm', FieldEditorForm);
uiComponents.FieldEditorForm = FieldEditorFormUI;
register('FormEditor', FormEditor);
uiComponents.FormEditor = FormEditorUI;
register('FormBuilder', FormBuilder);

// You can register custom components with the backend and frontend separately
register('CustomComponent', CustomComponent);
uiComponents.CustomComponent = ReactCustomComponent;
register('CustomComponentJS', CustomComponentJS);
uiComponents.CustomComponentJS = ReactCustomComponentJS;

// You can also register UIComponents that bundle the frontend and backend together
register('CustomComponentNoProps', CustomComponentNoProps);
register('CustomComponentAttach', CustomComponentAttach);

// Register all the components
Object.keys(components).forEach((name) => register(components[name]));

// Instantiate the app
const app = compiler.newComponent({
  component: 'app.App',
});

export default app;
