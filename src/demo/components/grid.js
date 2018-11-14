export default {
  name: 'app.Grid',
  component: 'Grid',
  items: [
    {
      component: 'GridItem',
      md: 6,
      xs: 12,
      content: {
        component: 'Text',
        text: '# A'
      }
    },
    {
      component: 'GridItem',
      md: 6,
      xs: 12,
      content: {
        component: 'Text',
        text: '# B'
      }
    },
    {
      component: 'GridItem',
      md: 6,
      xs: 12,
      content: {
        component: 'Text',
        text: '# C'
      }
    },
    {
      component: 'GridItem',
      md: 6,
      xs: 12,
      content: {
        component: 'Text',
        text: '# D'
      }
    },
    {
      component: 'GridItem',
      md: 6,
      xs: 12,
      content: {
        name: 'toggleA',
        component: 'ButtonField',
        label: 'Toggle A',
        listeners: [
          {
            event: 'click',
            actions: [
              {
                component: 'Action',
                if: {
                  'parent.parent.items.0.hidden': true
                },
                actions: [
                  {
                    component: 'Set',
                    name: 'parent.parent.items.0.hidden',
                    value: false
                  }
                ],
                else: [
                  {
                    component: 'Set',
                    name: 'parent.parent.items.0.hidden',
                    value: true
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ]
};
