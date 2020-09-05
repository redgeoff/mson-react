import { fireEvent } from '@testing-library/react';
import { compileAndRender } from '../test-utils';

const definition = {
  name: 'color',
  component: 'SelectField',
  label: 'Color',
  help: 'Example help',
  required: true,
  blankString: 'None',
  options: [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
  ],
};

// TODO:
// it('should select', async () => {
//   const { getByLabelText } = compileAndRender(definition);

//   // Click to display the drop down
//   const field = getByLabelText(/Color/);
//   fireEvent.click(field); // TODO: why doesn't this display the drop down?
// });

it('should select with focus and key presses', async () => {
  const { getByLabelText } = compileAndRender(definition);

  // Display the drop down
  const field = getByLabelText(/Color/);
  fireEvent.focus(field);
  fireEvent.keyDown(field, { key: 'ArrowDown', code: 'ArrowDown' });

  // Select the first option
  fireEvent.keyDown(field, { key: 'Enter', code: 'Enter' });

  // Verify that value was set
  expect(field.textContent).toEqual('Red');
});

// TODO: should initialize

// TODO: should select multiple options

// TODO: should select when not autocomplete

// TODO: should initialize when not autocomplete

// TODO: should select multiple options when not autocomplete