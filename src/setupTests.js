// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect';

import mediaQuery from 'css-mediaquery';

function createMatchMedia(width) {
  return (query) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
}

// Fail tests on any console error
const error = console.error;
console.error = function (message) {
  error.apply(console, arguments); // keep default behaviour
  throw message;
};

// Fail tests on any console warn
const warn = console.warn;
console.warn = function (message) {
  warn.apply(console, arguments); // keep default behaviour
  throw message;
};

// Currently needed to support Material UI's withMobileDialog, etc... See
// https://material-ui.com/components/use-media-query/#testing
global.window.matchMedia = createMatchMedia(window.innerWidth);
