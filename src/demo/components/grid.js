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
        name: 'hideA',
        component: 'ButtonField',
        label: 'Hide A',
        listeners: [
          {
            event: 'click',
            actions: [
              {
                component: 'Set',
                name: 'parent.parent.items.0.hidden',
                value: true
              }
            ]
          }
        ]
      }
    }
  ]
};
