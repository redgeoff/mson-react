import React from 'react';
import InnerComponent from './inner-component';
import compiler from 'mson/lib/compiler';

export default class Component extends React.PureComponent {
  state = { component: null };

  createComponent() {
    const { definition } = this.props;
    this.setState({ component: compiler.newComponent(definition) });
  }

  componentDidMount() {
    if (this.props.definition) {
      this.createComponent();
    }
  }

  componentWillUnmount() {
    const { component } = this.state;

    // Did we use a definition to define a component in the state?
    if (component) {
      // Fire the unmount before we destroy the component so that the event is not lost
      component.emitChange('unmount');

      // Remove all listeners to prevent listener leaks
      this.state.component.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    // Is the definition changing?
    if (this.props.definition !== prevProps.definition) {
      this.createComponent();
    }
  }

  render() {
    const { definition, component, ...childProps } = this.props;
    let comp = component;

    // Should we use the component generated from the definition?
    if (!component) {
      comp = this.state.component;
    }

    return <InnerComponent component={comp} {...childProps} />;
  }
}
