import { fireEvent } from '@testing-library/react';
import { compileAndRender } from '../test-utils';
import format from 'date-fns/format';

const definition = {
  component: 'DateField',
  name: 'date',
  label: 'Date',
  help: 'Date help',
};

// We used to always choose 17 as our test day, but when the tests are actually run on the 17th of
// the month, they would fail as there would be multiple buttons for the 17th: the current day in
// the header and the day button in the calendar itself. To avoid this, we pick 18, another
// unique number that isn't 17
const currentDay = new Date().getDate();
const testDay = currentDay === 17 ? 18 : 17;

const shouldPickDate = (definition, expectedValue) => {
  const { getByLabelText, getByRole } = compileAndRender(definition);

  // Click text field--this will launch the picker
  const textField = getByLabelText(/Date/, { selector: 'input' });
  fireEvent.click(textField);

  // Select the test day of the current month
  const day = getByRole('button', { name: RegExp(testDay) });
  fireEvent.click(day);

  // Click OK to close the date picker
  const ok = getByRole('button', { name: /OK/i });
  fireEvent.click(ok);

  // Verify that the input has been updated accordingly
  expect(textField).toHaveValue(expectedValue);
};

it('should pick date', async () => {
  const month = new Date().toLocaleString('default', { month: 'long' });
  shouldPickDate(definition, `${month} ${testDay}th`);
});

it('should pick date with custom format', async () => {
  const yearMonth = format(new Date(), 'yyyy-MM');
  shouldPickDate(
    {
      ...definition,
      format: 'yyyy-MM-dd',
    },
    `${yearMonth}-${testDay}`
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
