import React from 'react';
import AppContainer from './app-container';
import compiler from 'mson/lib/compiler';
import { render, waitFor, fireEvent } from '@testing-library/react';

const definition = {
  name: 'app.App',
  component: 'App',
  menu: {
    component: 'Menu',
    items: [
      {
        path: '/route-to-component',
        label: 'Route to Component',
        content: {
          component: 'Text',
          text: 'Route to Component Text',
        },
      },
      {
        path: '/redirect-landing',
        label: 'Redirect Landing',
        content: {
          component: 'Text',
          text: 'Redirect Landing Text',
        },
      },
      {
        path: '/redirect',
        label: 'Redirect',
        content: {
          component: 'Action',
          actions: [
            {
              component: 'Redirect',
              path: '/redirect-landing',
            },
          ],
        },
      },
      {
        path: '/generate-component',
        label: 'Generate Component',
        content: {
          component: 'Action',
          actions: [
            {
              component: 'GenerateComponent',
              definition: JSON.stringify({
                component: 'Text',
                text: 'Generate Component Text',
              }),
            },
          ],
        },
      },
      // TODO: is this a valid use case? It would be strange to not have a redirect or render a
      // component, for the user to see.
      //
      // {
      //   path: '/non-component',
      //   label: 'Non Component',
      //   content: {
      //     component: 'Action',
      //     actions: [
      //       {
      //         component: 'GenerateComponent',
      //         definition: JSON.stringify({
      //           component: 'Form',
      //           fields: [
      //             {
      //               component: 'TextField',
      //               name: 'first'
      //             }
      //           ]
      //         })
      //       },
      //       {
      //         component: 'Set',
      //         target: '{{arguments}}',
      //         value: {
      //           first: 'Moss'
      //         }
      //       }
      //     ]
      //   },
      // }
    ],
  },
};

const app = compiler.newComponent(definition);

it('should route to component', async () => {
  const { getByRole, findByText } = render(<AppContainer component={app} />);

  const routeToComponent = getByRole('button', { name: /Route to Component/i });
  fireEvent.click(routeToComponent);

  await findByText(/Route to Component Text/);
});

it('should redirect', async () => {
  const { getByRole, findByText } = render(<AppContainer component={app} />);

  const redirect = getByRole('button', { name: /^Redirect$/i });
  fireEvent.click(redirect);

  await findByText(/Redirect Landing Text/);
});

it('should generate component', async () => {
  const { getByRole, findByText } = render(<AppContainer component={app} />);

  const redirect = getByRole('button', { name: /Generate Component/i });
  fireEvent.click(redirect);

  await findByText(/Generate Component Text/);
});
