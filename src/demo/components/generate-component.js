// Dynamically generate a field based on a query parameter
const generateComponent = {
  name: 'app.GenerateComponent',
  component: 'Action',
  schema: {
    component: 'Form',
    fields: [
      {
        name: 'componentType',
        component: 'TextField',
        // value: 'CountryField' // TODO: allow for defaulting here
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
          value: 'CountryField',
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
              { value: 'PersonFullNameField', label: 'PersonFullNameField' },
              { value: 'CountryField', label: 'CountryField' },
            ],
            value: '{{componentType}}',
            autocomplete: false,
          },
          {
            name: 'generatedField',
            component: '{{componentType}}',
            label: 'Generated Field',
          },
        ],
        listeners: [
          {
            event: 'fields.type.value',
            actions: [
              {
                component: 'Redirect',
                path: '/router/generate-component?type={{fields.type.value}}',
              },
            ],
          },
        ],
      }),
    },
  ],
};

export default generateComponent;
