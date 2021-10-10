import { fireEvent, waitFor, screen } from '@testing-library/react';
import { compileAndRender } from '../test-utils';
import {
  makeDnd,
  DND_DIRECTION_DOWN,
  DND_DIRECTION_UP,
} from 'react-beautiful-dnd-test-utils';

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

const orderedDefinition = {
  ...definition,
  forbidOrder: false,
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

const expectContactsToEqual = async (contacts) => {
  await waitFor(
    () => {
      const nodes = screen.getAllByLabelText(/First Name/);
      expect(nodes.map((node) => node.textContent)).toEqual(contacts);
    },
    {
      // When tests are running concurrently, it sometimes takes up to 2s for the results to settle
      timeout: 2000,
    }
  );
};

it('should list', async () => {
  compileAndRender(definition, contacts);

  await expectContactsToEqual(['Daenerys', 'Jon', 'Tyrion']);
});

const create = async (firstName) => {
  // Click "New Contact" button
  const newContact = screen.getByRole('button', { name: /New Contact/i });
  fireEvent.click(newContact);

  // Fill in First Name
  const first = await screen.findByLabelText(/First Name/, {
    // Scope to only input fields as there may be display elements with the same label
    selector: 'input',
  });
  fireEvent.change(first, { target: { value: firstName } });

  // Save the form
  const save = screen.getByRole('button', { name: /Save/i });
  fireEvent.click(save);
};

const shouldCreate = async () => {
  await create('Ray');

  // Verify that the contact now appears in the list
  await expectContactsToEqual(['Ray']);
};

it('should create', async () => {
  compileAndRender(definition);

  await shouldCreate();
});

const populateList = async (def) => {
  const renderResult = compileAndRender(
    def === undefined ? definition : def,
    contacts
  );
  await expectContactsToEqual(['Daenerys', 'Jon', 'Tyrion']);
  return renderResult;
};

it('should view', async () => {
  await populateList();

  // Click to view first item
  const view = screen.getByRole('button', { name: /View.*daenerys/i });
  fireEvent.click(view);

  // Verify that item is being displayed. The extra "Daenerys" is the contact displayed in the
  // FormDialog. TODO: is there a better way to perform this check?
  await expectContactsToEqual(['Daenerys', 'Jon', 'Tyrion', 'Daenerys']);
});

const edit = async (id, firstName) => {
  // Edit item
  const edit = screen.getByRole('button', { name: RegExp(`Edit.*${id}`, 'i') });
  fireEvent.click(edit);

  // Fill in First Name
  const first = await screen.findByLabelText(/First Name/, {
    selector: 'input',
  });
  fireEvent.change(first, { target: { value: firstName } });

  // Save the form
  const save = screen.getByRole('button', { name: /Save/i });
  fireEvent.click(save);
};

it('should edit', async () => {
  await populateList();

  await edit('daenerys', 'Sansa');

  // Verify that the contact now appears in the list
  await expectContactsToEqual(['Sansa', 'Jon', 'Tyrion']);
});

it('should create and edit first time', async () => {
  const { component } = compileAndRender(definition);

  await shouldCreate();

  const id = component.getValue()[0].id;

  await edit(id, 'Sansa');

  // Verify that the contact now appears in the list
  await expectContactsToEqual(['Sansa']);
});

it('should reorder', async () => {
  await populateList(orderedDefinition);

  // Drag daenerys down by one position
  await makeDnd({
    getByText: screen.getByText,
    getDragEl: () => screen.getByLabelText(/Drag.*daenerys/i),
    direction: DND_DIRECTION_DOWN,
    positions: 1,
  });

  await expectContactsToEqual(['Jon', 'Daenerys', 'Tyrion']);
});

it('should reorder after create', async () => {
  const { component } = compileAndRender(orderedDefinition);

  await create('Jon');
  // const jonId = component.getValue()[0].id;

  await expectContactsToEqual(['Jon']);

  await create('Daenerys');

  await expectContactsToEqual(['Jon', 'Daenerys']);

  const daenerysId = component.getValue()[1].id;

  // Drag daenerys up by one position
  await makeDnd({
    getByText: screen.getByText,
    getDragEl: () => screen.getByLabelText(RegExp(`Drag.*${daenerysId}`, 'i')),
    direction: DND_DIRECTION_UP,
    positions: 1,
  });

  await expectContactsToEqual(['Daenerys', 'Jon']);
});

// TODO: archive

// TODO: restore

// TODO: sort (including according by a non-default attribute)

// TODO: search

// TODO: edit, delete, close from view popup

// TODO: cancel from edit popup
