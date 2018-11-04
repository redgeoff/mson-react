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
let unmounted = null;

beforeEach(() => {
  component = compiler.newComponent(definition);
  unmounted = false;
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Component component={component} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const shouldListenToEvents = async jsx => {
  const { getByLabelText, unmount } = render(jsx);

  const field = getByLabelText('First Name');

  // Wait for initial value
  await wait(() => expect(field.value).toEqual('Bob'));

  // Fill in Ella
  fireEvent.change(field, { target: { value: 'Ella' } });

  // Wait for change to Lauryn
  await wait(() => expect(field.value).toEqual('Lauryn'));

  // Unmount
  unmount();
  expect(unmounted).toEqual(true);
};

it('should listen to all events', async () => {
  await shouldListenToEvents(
    <Component
      component={component}
      on={({ name, value, component }) => {
        if (name === 'mount') {
          // Initial value
          component.setValue('Bob');
        } else if (name === 'unmount') {
          unmounted = true;
        } else if (name === 'value' && value === 'Ella') {
          // Change value from Ella to Lauryn
          component.setValue('Lauryn');
        }
      }}
    />
  );
});

it('should listen to specific events', async () => {
  await shouldListenToEvents(
    <Component
      component={component}
      onMount={({ component }) => component.setValue('Bob')}
      onUnmount={() => (unmounted = true)}
      onValue={({ value, component }) => {
        if (value === 'Ella') {
          // Change value from Ella to Lauryn
          component.setValue('Lauryn');
        }
      }}
    />
  );
});

it('should create with definition', async () => {
  await shouldListenToEvents(
    <Component
      definition={definition}
      onMount={({ component }) => component.setValue('Bob')}
      onUnmount={() => (unmounted = true)}
      onValue={({ value, component }) => {
        if (value === 'Ella') {
          // Change value from Ella to Lauryn
          component.setValue('Lauryn');
        }
      }}
    />
  );
});

const shouldChangeComponent = async (props1, props2) => {
  const { getByText, getByLabelText, rerender } = render(
    <Component {...props1} />
  );

  expect(getByText('First Name')).not.toBeNull();

  // Rerender with a different component
  rerender(
    <Component
      {...props2}
      on={({ name, value, component }) => {
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

  // Rerender with the same component
  rerender(<Component {...props2} />);
};

it('should change component', async () => {
  const age = compiler.newComponent({
    name: 'age',
    component: 'NumberField',
    label: 'Age'
  });

  await shouldChangeComponent({ component }, { component: age });
});

it('should change definition', async () => {
  const age = {
    name: 'age',
    component: 'NumberField',
    label: 'Age'
  };

  await shouldChangeComponent({ definition }, { definition: age });
});
