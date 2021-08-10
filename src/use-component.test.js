import { render, waitFor, screen } from '@testing-library/react';
import compile from 'mson/lib/compiler/compile';
import useComponent from './use-component';

const Contact = compile({
  component: 'UIComponent',
  name: 'Contact',
  schema: {
    component: 'Form',
    fields: [
      {
        component: 'TextField',
        name: 'firstName',
      },
      {
        component: 'TextField',
        name: 'lastName',
      },
    ],
  },
});

const ReactContact = (props) => {
  const { firstName, lastName } = useComponent(props.component, [
    'firstName',
    'lastName',
  ]);
  return (
    <div>
      <div>First Name: {firstName}</div>
      <div>Last Name: {lastName}</div>
    </div>
  );
};

const expectNameToEqual = (first, last) => {
  const firstName = screen.getByText(/First Name/);
  expect(firstName).toHaveTextContent(`First Name: ${firstName}`);
  const lastName = screen.getByText(/Last Name/);
  expect(lastName).toHaveTextContent(`Last Name: ${last}`);
};

const isShouldTestHappyPath = () => {
  const contact = new Contact({
    firstName: 'Jerry',
    lastName: 'Garcia',
  });

  render(<ReactContact component={contact} />);

  expectNameToEqual('Jerry', 'Garcia');

  return contact;
};

it('should useComponent for happy path', () => {
  isShouldTestHappyPath();
});

it('should useComponent when props change sequentially', async () => {
  const contact = isShouldTestHappyPath();

  // Change the first name
  contact.set({ firstName: 'Gerry' });
  await waitFor(() => expectNameToEqual('Gerry', 'Garcia'));

  // Change the last name
  contact.set({ lastName: 'Jarcia' });
  await waitFor(() => expectNameToEqual('Gerry', 'Jarcia'));
});

// TODO: don't forget case when component not defined
// it('should useComponent when component changes', async () => {})
