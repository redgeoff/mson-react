import React from 'react';
import AppContainer from './app-container';
import compiler from 'mson/lib/compiler';
import { render, fireEvent } from '@testing-library/react';

const generateComplexComponent = {
  component: 'Action',
  schema: {
    component: 'Form',
    fields: [
      {
        name: 'componentType',
        component: 'TextField',
        // value: 'ButtonField' // TODO: allow for defaulting here
      },
    ],
  },
  actions: [
    {
      component: 'Action',
      if: {
        'globals.route.query.type': null,
      },
      actions: [
        {
          component: 'Set',
          name: 'componentType',
          value: 'ButtonField',
        },
      ],
      else: [
        {
          component: 'Set',
          name: 'componentType',
          value: '{{globals.route.query.type}}',
        },
      ],
    },
    {
      component: 'GenerateComponent',
      definition: JSON.stringify({
        component: 'Form',
        fields: [
          {
            name: 'type',
            component: 'SelectField',
            label: 'Field Type',
            options: [
              { value: 'TextField', label: 'TextField' },
              { value: 'ButtonField', label: 'ButtonField' },
            ],
            value: '{{componentType}}',
          },
          {
            name: 'generatedField',
            component: '{{componentType}}',
            label: '{{componentType}} Label',
          },
        ],
        listeners: [
          {
            event: 'fields.type.value',
            actions: [
              {
                component: 'Redirect',
                path: '/generate-complex-component?type={{fields.type.value}}',
              },
            ],
          },
        ],
      }),
    },
  ],
};

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

      {
        path: '/generate-complex-component',
        label: 'Generate Complex Component',
        content: generateComplexComponent,
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

it('should generate complex component', async () => {
  const { getByRole, findByRole, findByLabelText } = render(
    <AppContainer component={app} />
  );

  const redirect = getByRole('button', { name: /Generate Complex Component/i });
  fireEvent.click(redirect);

  // Ensure that the default field (a ButtonField) is displayed
  await findByRole('button', { name: /ButtonField Label/i });

  // Now, select TextField and make sure it is displayed
  const typeField = await findByLabelText(/Field Type/);
  fireEvent.focus(typeField);
  fireEvent.keyDown(typeField, { key: 'ArrowDown', code: 'ArrowDown' });
  fireEvent.keyDown(typeField, { key: 'Enter', code: 'Enter' });
  await findByLabelText(/TextField Label/);
});
