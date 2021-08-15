import { useState, useEffect, useRef } from 'react';

export default function useComponent(component, watchProps) {
  const [props, setProps] = useState({});

  // We need useRef so that we can reference watchProps in the useEffect below
  const watchedProps = useRef(watchProps).current;

  useEffect(() => {
    // The component can be created at any time, e.g. when the definition is set. Therefore, we need
    // to handle a missing component until the component is present.
    const hasComponent = () => !!component;

    function handleFieldChange(name, value) {
      if (watchedProps.indexOf(name) !== -1) {
        setProps((prevProps) => ({ ...prevProps, [name]: value }));
      }
    }

    function addListener() {
      if (hasComponent()) {
        component.on('$change', handleFieldChange);

        // Initialize the props using the component's values
        setProps(component.get(watchedProps));
      }
    }

    function removeListener() {
      if (hasComponent()) {
        component.removeListener('$change', handleFieldChange);
      }
    }

    addListener();
    return () => removeListener();
  }, [component, watchedProps]); // Only rerun if component changes

  return props;
}
