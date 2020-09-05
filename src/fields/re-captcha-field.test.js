import { compileAndRender } from '../test-utils';
import globals from 'mson/lib/globals';

const definition = {
  name: 'captcha',
  component: 'ReCAPTCHAField',
  label: 'Captcha',
  help: 'Example help',
};

globals.set({ reCAPTCHASiteKey: '6LdIbGMUAAAAAJnipR9t-SnWzCbn0ZX2myXBIauh' });

it('should render', async () => {
  const { getByText } = compileAndRender(definition);
});
