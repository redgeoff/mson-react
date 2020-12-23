const router = {
  name: 'app.Router',
  component: 'Form',
  fields: [
    {
      component: 'TextField',
      name: 'personId',
      label: 'personId',
      block: false,
    },
    {
      component: 'TextField',
      name: 'messageId',
      label: 'messageId',
    },
    {
      component: 'TextField',
      name: 'first',
      label: 'first',
      block: false,
    },
    {
      component: 'TextField',
      name: 'last',
      label: 'last',
    },
    {
      component: 'TextField',
      name: 'hash',
      label: 'hash',
    },
    {
      component: 'ButtonField',
      name: 'submit',
      label: 'Go',
      type: 'submit',
      icon: 'Send',
    },
  ],
  listeners: [
    {
      event: 'load',
      actions: [
        {
          component: 'Set',
          name: 'value',
          value: {
            personId: '{{globals.route.parameters.personId}}',
            messageId: '{{globals.route.parameters.messageId}}',
            first: '{{globals.route.query.first}}',
            last: '{{globals.route.query.last}}',
            hash: '{{globals.route.hash}}',
          },
        },
      ],
    },
    {
      event: 'submit',
      actions: [
        {
          component: 'Set',
          name: 'pristine',
          value: true,
        },
        {
          component: 'Redirect',
          path:
            '/router/person/{{fields.personId.value}}/message/{{fields.messageId.value}}?first={{fields.first.value}}&last={{fields.last.value}}#{{fields.hash.value}}',
        },
      ],
    },
  ],
};

export default router;
