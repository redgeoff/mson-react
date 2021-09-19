import React, { useState, useEffect } from 'react';
import InnerComponent from './inner-component';
import compiler from 'mson/lib/compiler';
import useComponent from './use-component';
import { makeStyles } from '@material-ui/core/styles';

const getOrZero = (value) => (value ? value : 0);

const useStyles = makeStyles((theme) => ({
  root: (props) => {
    const { marginTop, marginRight, marginBottom, marginLeft } = props;
    return {
      marginTop: theme.spacing(getOrZero(marginTop)),
      marginRight: theme.spacing(getOrZero(marginRight)),
      marginBottom: theme.spacing(getOrZero(marginBottom)),
      marginLeft: theme.spacing(getOrZero(marginLeft)),
    };
  },
}));

export default function Component(props) {
  const { component, definition, ...childProps } = props;
  const [compiledComponent, setCompiledComponent] = useState(null);

  const { hidden, styles } = useComponent(component, ['hidden', 'styles']);
  const styleProps = styles ? styles.get() : {};
  const classes = useStyles(styleProps);

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
    // As a slight optimization, only display a span tag if styles is truthy
    const innerComponent = <InnerComponent component={comp} {...childProps} />;
    if (styles) {
      // Use a div so that we have a block-level element that supports vertical margins
      return <div className={classes.root}>{innerComponent}</div>;
    } else {
      return innerComponent;
    }
  }
}
