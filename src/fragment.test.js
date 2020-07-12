import React from 'react';
import Component from './component';
import { render } from '@testing-library/react';

it('should render items', async () => {
  const definition = {
    component: 'Fragment',
    items: [
      {
        component: 'Text',
        text: 'MyItem',
      },
      {
        component: 'Text',
        text: 'MyItem',
      },
    ],
  };

  const { getAllByText } = render(<Component definition={definition} />);

  const items = await getAllByText(/MyItem/);
  expect(items).toHaveLength(2);
});
