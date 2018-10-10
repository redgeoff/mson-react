// Note: this file is named bundle.js and not index.js so that it doesn't interfer with
// react-scripts' expectation of an index.js when running `yarn start`. We should rename bundle.js
// to index.js if we decide to move away from react-scripts.

import render from './render';
import compiler from 'mson/lib/mson/compiler';
import Component from './component';

// Note: the "default" must be excluded so that webpack can bundle the library properly
export { compiler, Component, render };
