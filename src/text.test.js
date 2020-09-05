import { compileAndRender } from './test-utils';

const definition = {
  name: 'text',
  component: 'Text',
  text: '[example.com](https://example.com/)',
};

it('should render markdown', async () => {
  const { getByText } = compileAndRender(definition);

  const text = getByText(/example/);
  expect(text.href).toBe('https://example.com/');
});
