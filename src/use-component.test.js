import { render, waitFor, screen, act } from '@testing-library/react';
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
      <div>First Name:{firstName}</div>
      <div>Last Name:{lastName}</div>
    </div>
  );
};

const expectNameToEqual = (first, last) => {
  const firstName = screen.getByText(/First Name/);
  expect(firstName).toHaveTextContent(`First Name:${first}`);
  const lastName = screen.getByText(/Last Name/);
  expect(lastName).toHaveTextContent(`Last Name:${last}`);
};

const createJerry = () =>
  new Contact({
    firstName: 'Jerry',
    lastName: 'Garcia',
  });

const shouldTestHappyPath = () => {
  const contact = createJerry();

  render(<ReactContact component={contact} />);

  expectNameToEqual('Jerry', 'Garcia');

  return contact;
};

it('should useComponent for happy path', () => {
  shouldTestHappyPath();
});

it('should useComponent when props change sequentially', async () => {
  const contact = shouldTestHappyPath();

  // Change the first name
  act(() => contact.set({ firstName: 'Gerry' }));
  await waitFor(() => expectNameToEqual('Gerry', 'Garcia'));

  // Change the last name
  act(() => contact.set({ lastName: 'Jarcia' }));
  await waitFor(() => expectNameToEqual('Gerry', 'Jarcia'));
});

it('should useComponent when component changes', async () => {
  // Render without a MSON component
  const { rerender } = render(<ReactContact />);
  expectNameToEqual('', '');

  // Set component
  const jerry = createJerry();
  rerender(<ReactContact component={jerry} />);
  expectNameToEqual('Jerry', 'Garcia');

  // Change the component
  const bob = new Contact({
    firstName: 'Bob',
    lastName: 'Weir',
  });
  rerender(<ReactContact component={bob} />);
  expectNameToEqual('Bob', 'Weir');
});

it('useComponent should remove listener when unmounting', async () => {
  const jerry = createJerry();
  const on = jest.spyOn(jerry, 'on');
  const removeListener = jest.spyOn(jerry, 'removeListener');
  const { unmount } = render(<ReactContact component={jerry} />);
  expect(on.mock.calls[0][0]).toEqual('$change');
  expectNameToEqual('Jerry', 'Garcia');

  unmount();
  expect(removeListener.mock.calls[0][0]).toEqual('$change');
});
