import compiler from 'mson/lib/compiler';
import * as components from './components';
import globals from 'mson/lib/globals';
import uiComponents from '../components';
import FieldEditorForm from 'mson/lib/form/field-editor-form';
import FieldEditorFormUI from '../field-editor-form';

// Set the site key when using the ReCAPTCHAField
globals.set({ reCAPTCHASiteKey: '6LdIbGMUAAAAAJnipR9t-SnWzCbn0ZX2myXBIauh' });

// Register optional core components
compiler.registerComponent('FieldEditorForm', FieldEditorForm);
uiComponents.FieldEditorForm = FieldEditorFormUI;

// Register all the components
for (let name in components) {
  let component = components[name];
  compiler.registerComponent(component.name, component);
}

// Instantiate the app
const app = compiler.newComponent({
  component: 'app.App'
});

export default app;
