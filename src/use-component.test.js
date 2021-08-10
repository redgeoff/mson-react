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

it('should useComponent for happy path', () => {
  const contact = new Contact({
    firstName: 'Jerry',
    lastName: 'Garcia',
  });

  render(<ReactContact component={contact} />);

  const firstName = screen.getByText(/First Name/);
  expect(firstName).toHaveTextContent('First Name: Jerry');
  const lastName = screen.getByText(/Last Name/);
  expect(lastName).toHaveTextContent('Last Name: Garcia');
});

// it('should useComponent when props change sequentially', async () => {})

// it('should useComponent when component changes', async () => {})
