import React, { useState, useEffect } from 'react';
import InnerComponent from './inner-component';
import compiler from 'mson/lib/compiler';
import useComponent from './use-component';

export default function Component(props) {
  const { component, definition, ...childProps } = props;
  const [compiledComponent, setCompiledComponent] = useState(null);
  const { hidden } = useComponent(component, ['hidden']);

  // Should we use the component generated from the definition?
  const comp = component ? component : compiledComponent;

  // Compile the component when the definition changes
  useEffect(() => {
    if (definition) {
      setCompiledComponent(compiler.newComponent(definition));
    }
  }, [definition]);

  useEffect(() => {
    return () => {
      // Unmount
      // Did we use a definition to define a component in the state?
      if (comp) {
        // Fire the unmount before we destroy the component so that the event is not lost
        comp.emitChange('unmount');

        // Remove all listeners to prevent listener leaks
        comp.destroy();
      }
    };
  }, []);

  // Note: the component can be falsy, e.g. it has not yet been defined
  if (comp && hidden) {
    return null;
  } else {
    return <InnerComponent component={comp} {...childProps} />;
  }
}
