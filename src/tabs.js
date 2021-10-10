import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import TabsMui from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from './icon';
import useComponent from './use-component';

export default function Tabs(props) {
  const { component } = props;
  const { items, value } = useComponent(component, ['items', 'value']);

  function handleChange(event, value) {
    component.set({ value });

    const itemName = items[value].name;
    component.emitChange(itemName);
  }

  // FUTURE: option to make this fixed under the main app bar?
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1} // tone down the elevation>
    >
      <TabsMui
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        scrollButtons="auto"
        variant="fullWidth"
      >
        {items &&
          items.map((item, index) => (
            <Tab
              label={item.label}
              icon={<Icon icon={item.icon} />}
              key={index}
            />
          ))}
      </TabsMui>
    </AppBar>
  );
}
