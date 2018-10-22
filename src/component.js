import React from 'react';
import componentUtils from './component-utils';

export default class Component extends React.PureComponent {
  render() {
    const { component, ...others } = this.props;

    const Component = componentUtils.getUIComponent(component);

    return <Component component={component} {...others} />;
  }
}
