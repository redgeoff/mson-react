import React from 'react';
import Component from '../component';
import { render, fireEvent } from '@testing-library/react';
import compiler from 'mson/lib/compiler';

const definition = {
  component: 'DateField',
  name: 'date',
  label: 'Date',
  help: 'Date help',
};

it('should pick date', async () => {
  const component = compiler.newComponent(definition);

  const { getByLabelText, getByRole } = render(
    <Component component={component} />
  );

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

// it('should initialize picker', async () => {

// });
