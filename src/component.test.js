import React from 'react';
import Component from './component';
import compiler from 'mson/lib/compiler';
import { render, wait, fireEvent } from 'react-testing-library';

const definition = {
  name: 'firstName',
  component: 'TextField',
  label: 'First Name'
};

it('should listen to events', async () => {
  const { getByLabelText } = render(
    <Component
      component={compiler.newComponent(definition)}
      on={(name, value, component) => {
        if (name === 'load') {
          // Initial value
          component.setValue('Bob');
        } else if (name === 'value' && value === 'Ella') {
          // Change value from Ella to Lauryn
          component.setValue('Lauryn');
        }
      }}
    />
  );

  const field = getByLabelText('First Name');

  // Wait for initial value
  await wait(() => expect(field.value).toEqual('Bob'));

  // Fill in Ella
  fireEvent.change(field, { target: { value: 'Ella' } });

  // Wait for change to Lauryn
  await wait(() =>
    expect(getByLabelText('First Name').value).toEqual('Lauryn')
  );
});
