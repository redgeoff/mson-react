import { fireEvent } from '@testing-library/react';
import { compileAndRender } from '../test-utils';

const definition = {
  component: 'DateField',
  name: 'date',
  label: 'Date',
  help: 'Date help',
};

it('should pick date', async () => {
  const { getByLabelText, getByRole } = compileAndRender(definition);

  // Click text field--this will launch the picker
  const textField = getByLabelText(/Date/, { selector: 'input' });
  fireEvent.click(textField);

  // Select the 17th day of the current month
  const seventeenth = getByRole('button', { name: /17/ });
  fireEvent.click(seventeenth);

  // Click OK to close the date picker
  const ok = getByRole('button', { name: /OK/i });
  fireEvent.click(ok);

  // Verify that the input has been updated accordingly
  const month = new Date().toLocaleString('default', { month: 'long' });
  expect(textField).toHaveValue(`${month} 17th`);
});

it('should initialize picker', async () => {
  // Initialize with the current date
  const now = new Date();
  const timestamp = now.getTime();
  const { getByLabelText, getByRole } = compileAndRender(definition, timestamp);

  // Click text field--this will launch the picker
  const textField = getByLabelText(/Date/, { selector: 'input' });
  fireEvent.click(textField);

  // Verify that today is selected
  const day = now.getDate();
  const today = getByRole('button', { name: RegExp(`^${day}$`) });
  expect(today.className).toContain('daySelected');
});
