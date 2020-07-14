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

// Currently needed to support Material UI's withMobileDialog, etc... See
// https://material-ui.com/components/use-media-query/#testing
global.window.matchMedia = createMatchMedia(window.innerWidth);
