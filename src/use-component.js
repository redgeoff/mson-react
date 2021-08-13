import { useState, useEffect } from 'react';

export default function useComponent(component, watchProps) {
  const [props, setProps] = useState(
    component ? component.get(watchProps) : {}
  );

  // The component can be created at any time, e.g. when the definition is set. Therefore, we need
  // to handle a missing component until the component is present.
  function hasComponent() {
    return !!component;
  }

  useEffect(() => {
    let wasMounted = true;

    function handleFieldChange(name, value) {
      if (watchProps.indexOf(name) !== -1) {
        // Is the component mounted? Prevent a race condition where the handler tries to set the
        // state after the component has been unmounted.
        if (wasMounted) {
          setProps((prevProps) => ({ ...prevProps, [name]: value }));
        }
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

    // TODO: what happens when component set later?
    addListener();
    return () => {
      removeListener();
      wasMounted = false;
    };
  }, [component]); // Only rerun if component changes

  return props;
}
