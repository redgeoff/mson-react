import compiler from 'mson/lib/mson/compiler';
import * as components from './components';
import globals from 'mson/lib/mson/globals';

// Set the site key when using the ReCAPTCHAField
globals.set({ reCAPTCHASiteKey: 'TODO' });

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
