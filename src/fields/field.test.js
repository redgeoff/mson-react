import React from 'react';
import ReactDOM from 'react-dom';
import Field from './field';
import { Field as FieldModel } from 'mson/lib/fields';

it('renders', () => {
  const div = document.createElement('div');
  const field = new FieldModel();
  ReactDOM.render(<Field component={field} />, div);
});
