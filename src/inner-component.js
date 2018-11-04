import React from 'react';
import componentUtils from './component-utils';

export default class InnerComponent extends React.PureComponent {
  handleChange = (name, value) => {
    const { on, component } = this.props;

    // Generic handler
    if (on) {
      on({ name, value, component });
    }

    // Handler for specific event
    const handlerName = 'on' + name.charAt(0).toUpperCase() + name.slice(1);
    if (this.props[handlerName]) {
      this.props[handlerName]({ value, component });
    }
  };

  addChangeListener() {
    this.props.component.on('$change', this.handleChange);

    // Emit a mount event so that the component can load any initial data, etc... We emit this event
    // here and not in componentDidMount() as the component may actually be set after
    // componentDidMount() was run.
    this.props.component.emitChange('mount');
  }

  removeChangeListener() {
    this.props.component.removeListener('$change', this.handleChange);
  }

  componentDidMount() {
    if (this.props.component) {
      this.addChangeListener();
    }
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

    if (component) {
      const Component = componentUtils.getUIComponent(component);
      return <Component component={component} {...others} />;
    } else {
      return null;
    }
  }
}
