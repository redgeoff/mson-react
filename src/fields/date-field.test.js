import { fireEvent } from '@testing-library/react';
import { compileAndRender } from '../test-utils';
import format from 'date-fns/format';

const definition = {
  component: 'DateField',
  name: 'date',
  label: 'Date',
  help: 'Date help',
};

const shouldPickDate = (definition, expectedValue) => {
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
  expect(textField).toHaveValue(expectedValue);
};

it('should pick date', async () => {
  const month = new Date().toLocaleString('default', { month: 'long' });
  shouldPickDate(definition, `${month} 17th`);
});

it('should pick date with custom format', async () => {
  const yearMonth = format(new Date(), 'yyyy-MM');
  shouldPickDate(
    {
      ...definition,
      format: 'yyyy-MM-dd',
    },
    `${yearMonth}-17`
  );
});

it('should initialize picker', async () => {
  // Initialize with the current date
  const now = new Date();
  const timestamp = now.getTime();
  const { getByLabelText, getAllByRole } = compileAndRender(
    definition,
    timestamp
  );

  // Click text field--this will launch the picker
  const textField = getByLabelText(/Date/, { selector: 'input' });
  fireEvent.click(textField);

  // Verify that today is selected
  const day = now.getDate();
  // Note: we can have multiple buttons with this day, as some can be hidden. Only one should have
  // the daySelected class.
  const days = getAllByRole('button', { name: RegExp(`^${day}$`) });
  const selectedDays = days.filter((day) =>
    day.className.includes('daySelected')
  );
  expect(selectedDays).toHaveLength(1);
});
