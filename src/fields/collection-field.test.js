import React from 'react';
import Component from '../component';
import { render, fireEvent } from '@testing-library/react';
import compiler from 'mson/lib/compiler';

const definition = {
  component: 'CollectionField',
  name: 'contacts',
  label: 'Contacts',
  help: 'You contacts',
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

const expectContactsToEqual = async (findAllByLabelText, contacts) => {
  const nodes = await findAllByLabelText(/First Name/);
  expect(nodes.map((node) => node.textContent)).toEqual(contacts);
};

it('should list', async () => {
  const component = compiler.newComponent(definition);

  component.setValue(contacts);

  const { findAllByLabelText } = render(<Component component={component} />);

  await expectContactsToEqual(findAllByLabelText, [
    'Daenerys',
    'Jon',
    'Tyrion',
  ]);
});

it('should create', async () => {
  const component = compiler.newComponent(definition);

  const { findByLabelText, getByRole, findAllByLabelText } = render(
    <Component component={component} />
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
  await expectContactsToEqual(findAllByLabelText, ['Ray']);
});

// TODO: view

// TODO: update

// TODO: archive

// TODO: restore

// TODO: reorder

// TODO: sort (including according by a non-default attribute)

// TODO: search
