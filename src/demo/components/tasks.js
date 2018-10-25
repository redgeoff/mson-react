export default {
  name: 'app.Tasks',
  component: 'Form',
  schema: {
    component: 'Form',
    fields: [
      {
        name: 'store',
        component: 'Field'
      }
    ]
  },
  fields: [
    {
      component: 'Text',
      name: 'header',
      text: '(drag to reorder)'
    },
    {
      component: 'CollectionField',
      name: 'tasks',
      label: 'Tasks',
      hideLabel: true,
      // forbidCreate: true,
      // forbidUpdate: true,
      // forbidDelete: true,
      // forbidViewArchived: true,
      // forbidSearch: true,
      // forbidSort: true,
      forbidOrder: false,
      formFactory: {
        component: 'Factory',
        product: {
          component: 'Form',
          fields: [
            {
              name: 'task',
              component: 'TextField',
              label: 'Task',
              multiline: true,
              required: true
            },
            {
              name: 'due',
              component: 'DateField',
              label: 'Due'
            }
          ]
        }
      },
      store: '{{store}}'
    }
  ]
};
