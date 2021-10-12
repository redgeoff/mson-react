import React from 'react';
import AppUI from './app';
import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
  adaptV4Theme,
} from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter, Prompt } from 'react-router-dom';
import globals from 'mson/lib/globals';
import attach from './attach';

import { blueGrey, lightBlue } from '@mui/material/colors';

const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: blueGrey,
      // primary: blue,
      // type: 'dark',
      // secondary: cyan
      secondary: lightBlue,
    },

    // shadows: ['none']
  })
);

// Note: BrowserRouter needs to be outside of App so that we can use withRouter
class AppContainer extends React.Component {
  onNavigate = (message, callback) => {
    globals.onNavigate(message, callback);
  };

  render() {
    const { component, basename } = this.props;
    return (
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter
            getUserConfirmation={this.onNavigate}
            basename={basename}
          >
            {/* Wrapping div required by BrowserRouter */}
            <div>
              <AppUI component={component} />

              {/* A Prompt is needed to capture back/forward button events with ReactRouter. message
              is required, but the value is arbitrary */}
              <Prompt message="foo" />
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </StyledEngineProvider>
    );
  }
}

export default attach(['basename'])(AppContainer);
