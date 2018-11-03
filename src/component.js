import React from 'react';
import componentUtils from './component-utils';

export default class Component extends React.PureComponent {
  handleChange = (name, value) => {
    const { on, component } = this.props;
    if (on) {
      on(name, value, component);
    }
  };

  addChangeListener() {
    this.props.component.on('$change', this.handleChange);
  }

  removeChangeListener() {
    this.props.component.removeListener('$change', this.handleChange);
  }

  componentDidMount() {
    this.addChangeListener();

    // Emit a mount event so that the component can load any initial data, etc...
    this.props.component.emitChange('mount');
  }

  componentWillUnmount() {
    // Emit a unmount event so that we can perform any needed clean up
    this.props.component.emitChange('unmount');

    this.removeChangeListener();
  }

  componentDidUpdate(prevProps) {
    // Is the component changing?
    if (this.props.component !== prevProps.component) {
      // Recreate the listener
      this.removeChangeListener();
      this.addChangeListener();
    }
  }

  render() {
    const { component, ...others } = this.props;

    const Component = componentUtils.getUIComponent(component);

    return <Component component={component} {...others} />;
  }
}
