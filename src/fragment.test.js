import React from 'react';
// import ReactDOM from 'react-dom';
import Component from './component';
// import compiler from 'mson/lib/compiler';
// import { render, wait, fireEvent } from '@testing-library/react';
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
