import React from 'react';
import ReactDOM from 'react-dom';
import Component from './component';
import compiler from 'mson/lib/compiler';
import { render, wait, fireEvent } from 'react-testing-library';

const definition = {
  name: 'firstName',
  component: 'TextField',
  label: 'First Name'
};

let component = null;

beforeEach(() => {
  component = compiler.newComponent(definition);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Component component={component} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should listen to events', async () => {
  const { getByLabelText } = render(
    <Component
      component={component}
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
  await wait(() => expect(field.value).toEqual('Lauryn'));
});

it('should change component', async () => {
  const { getByText, getByLabelText, rerender } = render(
    <Component component={component} />
  );

  expect(getByText('First Name')).not.toBeNull();

  const age = compiler.newComponent({
    name: 'age',
    component: 'NumberField',
    label: 'Age'
  });

  // Rerender with a different component
  rerender(
    <Component
      component={age}
      on={(name, value, component) => {
        if (name === 'value' && value === '50') {
          component.setValue('40');
        }
      }}
    />
  );

  // Make sure UI was updated
  expect(getByText('Age')).not.toBeNull();

  const field = getByLabelText('Age');

  // Fill in age
  fireEvent.change(field, { target: { value: '50' } });

  // Wait for change
  await wait(() => expect(field.value).toEqual('40'));
});
