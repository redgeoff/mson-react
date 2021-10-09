import React from 'react';
import Component from './component';
import { render } from '@testing-library/react';
import compiler from 'mson/lib/compiler';

export const compileAndRender = (definition, value) => {
  const component = compiler.newComponent(definition);

  if (value !== undefined) {
    component.setValue(value);
  }

  return { ...render(<Component component={component} />), component };
};
