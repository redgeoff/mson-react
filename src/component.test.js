import React from 'react';
import Component from './component';
import compiler from 'mson/lib/compiler';
import { render, wait } from 'react-testing-library';

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
          component.setValue('Bob');
        }
      }}
    />
  );

  await wait(() => expect(getByLabelText('First Name').value).toEqual('Bob'));
});
