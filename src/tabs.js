import React from 'react';
import attach from './attach';
import AppBar from '@material-ui/core/AppBar';
import TabsMui from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from './icon';

class Tabs extends React.Component {
  handleChange = (event, value) => {
    const { component, items } = this.props;
    component.set({ value });

    const itemName = items[value].name;
    component.emitChange(itemName);
  };

  render() {
    const { items, value } = this.props;

    // FUTURE: option to make this fixed under the main app bar?
    return (
      <AppBar
        position="static"
        color="default"
        elevation={1} // tone down the elevation>
      >
        <TabsMui
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="auto"
          fullWidth
        >
          {items.map((item, index) => (
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
}

Tabs = attach(['items', 'value'])(Tabs);

export default Tabs;
