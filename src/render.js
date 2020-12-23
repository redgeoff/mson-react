import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './app-container';
import registrar from 'mson/lib/compiler/registrar';
import registerServiceWorker from './register-service-worker';

const render = async (app) => {
  // Was the client registered?
  if (registrar.client) {
    // Make sure we load the session before doing any rendering so that components can do their
    // initial rendering based on the user's authentication status
    await registrar.client.user.awaitSession();
  }

  ReactDOM.render(
    <AppContainer component={app} />,
    document.getElementById('root')
  );
  registerServiceWorker();
};

export default render;
