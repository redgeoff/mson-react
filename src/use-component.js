import { useState, useEffect } from 'react';

export default function useComponent(component, watchProps) {
  const [props, setProps] = useState({});

  // The component can be created at any time, e.g. when the definition is set. Therefore, we need
  // to handle a missing component until the component is present.
  function hasComponent() {
    return !!component;
  }

  useEffect(() => {
    let wasMounted = false;

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

        // Initialize the props using the component's values
        setProps(component.get(watchProps));
      }
    }

    function removeListener() {
      if (hasComponent()) {
        component.removeListener('$change', handleFieldChange);
      }
    }

    addListener();
    wasMounted = true;
    return () => {
      removeListener();
      wasMounted = false;
    };
  }, [component]); // Only rerun if component changes

  return props;
}
