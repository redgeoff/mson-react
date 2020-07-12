import React from 'react';
import Component from '../component';
import { render } from '@testing-library/react';
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

it('should list', async () => {
  const component = compiler.newComponent(definition);

  component.setValue(contacts);

  const { findAllByText } = render(<Component component={component} />);

  const items = await findAllByText(/First Name/);
  expect(items).toHaveLength(3);
});

// TODO: create

// TODO: view

// TODO: update

// TODO: archive

// TODO: restore

// TODO: reorder

// TODO: sort (including according by a non-default attribute)

// TODO: search
