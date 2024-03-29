const app = {
  name: 'app.App',
  component: 'App',
  // menuAlwaysTemporary: true,
  basename: '/mson-react', // Root of site is https://redgeoff.github.io/mson-react
  menu: {
    component: 'Menu',
    header: {
      component: 'Text',
      text: '### &nbsp;&nbsp;&nbsp;MSON Demo',
    },
    items: [
      {
        path: '/',
        label: 'Home',
        content: {
          component: 'app.Home',
        },
      },
      {
        path: '/fields',
        label: 'Fields',
        content: {
          component: 'app.FieldsScreen',
        },
      },
      {
        path: '/contacts',
        label: 'Contacts',
        items: [
          {
            path: '/contacts',
            label: 'Contacts LocalStorage',
            content: {
              component: 'app.ContactsLocalStorage',
            },
          },
          {
            path: '/contacts-firebase',
            label: 'Contacts Firebase',
            content: {
              component: 'app.ContactsFirebase',
            },
          },
        ],
      },
      {
        path: '/tasks',
        label: 'Tasks',
        items: [
          {
            path: '/tasks',
            label: 'Tasks LocalStorage',
            content: {
              component: 'app.TasksLocalStorage',
            },
          },
          {
            path: '/tasks-firebase',
            label: 'Tasks Firebase',
            content: {
              component: 'app.TasksFirebase',
            },
          },
        ],
      },
      {
        path: '/form-builder',
        label: 'Form Builder',
        content: {
          component: 'app.FormBuilder',
        },
      },
      {
        path: '/contact/edit',
        label: 'Edit Contact',
        content: {
          component: 'app.EditContact',
        },
      },
      {
        path: '/grid',
        label: 'Grid',
        content: {
          component: 'app.Grid',
        },
      },
      {
        path: '/router',
        label: 'Router',
        items: [
          {
            path: '/router/redirect',
            label: 'Redirect',
            content: {
              component: 'Action',
              actions: [
                {
                  component: 'Redirect',
                  path:
                    '/router/person/p123/message/m456?first=Trevor&last=Noah#hash123',
                },
              ],
            },
          },
          {
            path: '/router/generate-component',
            label: 'Generate Component',
            content: {
              component: 'app.GenerateComponent',
            },
          },
        ],
      },
      {
        path: '/router/person/:personId/message/:messageId',
        label: 'Router',
        content: {
          component: 'app.Router',
        },
        hidden: true, // Register route, but don't expose it in the menu
      },
      {
        path: '/custom-components',
        label: 'Custom Components',
        items: [
          {
            path: '/custom-components/mson',
            label: 'Custom Component',
            content: {
              component: 'CustomComponent',
              name: 'my-custom-component',
              label: 'My Custom Component',
            },
          },
          {
            path: '/custom-components/js',
            label: 'Custom Component JS',
            content: {
              component: 'CustomComponentJS',
              name: 'my-custom-component-js',
              label: 'My Custom Component JS',
            },
          },
          {
            path: '/custom-components/no-props',
            label: 'Custom Component No Props',
            content: {
              component: 'CustomComponentNoProps',
            },
          },
          {
            path: '/custom-components/attach',
            label: 'Custom Component Attach',
            content: {
              component: 'CustomComponentAttach',
              name: 'my-custom-component-attach',
              label: 'My Custom Component Attach',
            },
          },
          {
            path: '/custom-components/contact-no-mson',
            label: 'Contact No MSON',
            content: {
              component: 'app.ContactNoMSON',
            },
          },
        ],
      },
    ],
  },
};

export default app;
