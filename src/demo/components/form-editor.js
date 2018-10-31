export default {
  name: 'app.FormEditor',
  component: 'Form',
  fields: [
    {
      name: 'fields',
      component: 'CollectionField',
      label: 'Fields',
      hideLabel: true,
      maxColumns: 1,
      skipRead: true,
      includeExtraneous: true,
      forbidOrder: false,
      formFactory: {
        component: 'Factory',
        product: {
          component: 'FieldEditorForm'
        }
      },
      store: {
        component: 'LocalStorageStore',
        storeName: 'myForm'
      }
    }
  ]
};
