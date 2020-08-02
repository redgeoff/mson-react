import { fireEvent, waitFor } from '@testing-library/react';
import { compileAndRender } from '../test-utils';
import { makeDnd, DND_DIRECTION_DOWN } from 'react-beautiful-dnd-test-utils';

const definition = {
  component: 'CollectionField',
  name: 'contacts',
  label: 'Contacts',
  help: 'Your contacts',
  formFactory: {
    component: 'Factory',
    product: {
      component: 'Form',
      fields: [
        {
          name: 'firstName',
          component: 'TextField',
          label: 'First Name',
          required: true,
        },
      ],
    },
  },
};

const contacts = [
  {
    id: 'daenerys',
    firstName: 'Daenerys',
  },
  {
    firstName: 'Jon',
  },
  {
    id: 'tyrion',
    firstName: 'Tyrion',
  },
];

const expectContactsToEqual = async (getAllByLabelText, contacts) => {
  await waitFor(
    () => {
      const nodes = getAllByLabelText(/First Name/);
      expect(nodes.map((node) => node.textContent)).toEqual(contacts);
    },
    {
      // When tests are running concurrently, it sometimes takes up to 2s for the results to settle
      timeout: 2000,
    }
  );
};

it('should list', async () => {
  const { getAllByLabelText } = compileAndRender(definition, contacts);

  await expectContactsToEqual(getAllByLabelText, ['Daenerys', 'Jon', 'Tyrion']);
});

it('should create', async () => {
  const { findByLabelText, getByRole, getAllByLabelText } = compileAndRender(
    definition
  );

  // Click "New Contact" button
  const newContact = getByRole('button', { name: /New Contact/i });
  fireEvent.click(newContact);

  // Fill in First Name
  const firstName = await findByLabelText(/First Name/);
  fireEvent.change(firstName, { target: { value: 'Ray' } });

  // Save the form
  const save = getByRole('button', { name: /Save/i });
  fireEvent.click(save);

  // Verify that the contact now appears in the list
  await expectContactsToEqual(getAllByLabelText, ['Ray']);
});

const populateList = async (def) => {
  const renderResult = compileAndRender(
    def === undefined ? definition : def,
    contacts
  );
  const { getAllByLabelText } = renderResult;
  await expectContactsToEqual(getAllByLabelText, ['Daenerys', 'Jon', 'Tyrion']);
  return renderResult;
};

it('should view', async () => {
  const { getAllByLabelText, getByRole } = await populateList();

  // Click to view first item
  const view = getByRole('button', { name: /View.*daenerys/i });
  fireEvent.click(view);

  // Verify that item is being displayed. The extra "Daenerys" is the contact displayed in the
  // FormDialog. TODO: is there a better way to perform this check?
  await expectContactsToEqual(getAllByLabelText, [
    'Daenerys',
    'Jon',
    'Tyrion',
    'Daenerys',
  ]);
});

it('should edit', async () => {
  const {
    getAllByLabelText,
    getByRole,
    findByLabelText,
  } = await populateList();

  // Edit item
  const edit = getByRole('button', { name: /Edit.*daenerys/i });
  fireEvent.click(edit);

  // Fill in First Name
  const firstName = await findByLabelText(/First Name/, { selector: 'input' });
  fireEvent.change(firstName, { target: { value: 'Sansa' } });

  // Save the form
  const save = getByRole('button', { name: /Save/i });
  fireEvent.click(save);

  // Verify that the contact now appears in the list
  await expectContactsToEqual(getAllByLabelText, ['Sansa', 'Jon', 'Tyrion']);
});

it('should reorder', async () => {
  const { getAllByLabelText, getByText, getByLabelText } = await populateList({
    ...definition,
    forbidOrder: false,
  });

  // Drag daenerys down by one position
  await makeDnd({
    getByText,
    getDragEl: () => getByLabelText(/Drag.*daenerys/i),
    direction: DND_DIRECTION_DOWN,
    positions: 1,
  });

  await expectContactsToEqual(getAllByLabelText, ['Jon', 'Daenerys', 'Tyrion']);
});

// TODO: archive

// TODO: restore

// TODO: sort (including according by a non-default attribute)

// TODO: search

// TODO: edit, delete, close from view popup

// TODO: cancel from edit popup
