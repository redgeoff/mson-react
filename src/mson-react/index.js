import render from './render';
import compiler from 'mson/lib/mson/compiler';
import Component from './component';

// Note: the "default" must be excluded so that webpack can bundle the library properly
export { compiler, Component, render };
