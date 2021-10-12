import React from 'react';
import AppBar from '@mui/material/AppBar';
import TabsMui from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
