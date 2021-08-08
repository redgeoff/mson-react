import { useState, useEffect } from 'react';

export default function useComponent(component, watchProps) {
  const [props, setProps] = useState(null);

  useEffect(() => {
    // TODO: is this still needed?
    //
    // The component can be created at any time, e.g. when the definition is set. Therefore, we need
    // to handle a missing component until the component is present.
    function hasComponent() {
      return !!component;
    }

    function handleFieldChange(name, value) {
      if (watchProps.indexOf(name) !== -1) {
        // Is the component mounted? Prevent a race condition where the handler tries to set the
        // state after the component has been unmounted.
        // if (this.wasMounted) {
        setProps({ [name]: value });
        // }
      }
    }

    function addListener() {
      if (hasComponent()) {
        component.on('$change', handleFieldChange);
      }
    }

    function removeListener() {
      if (hasComponent()) {
        component.removeListener('$change', handleFieldChange);
      }
    }

    addListener();
    return removeListener;
  });

  if (props === null) {
    // TODO: zip or better way?
    const initialProps = {};
    watchProps.forEach((prop) => (initialProps[prop] = undefined));
    return initialProps;
  } else {
    return props;
  }
}
