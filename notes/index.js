import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './Auth0';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider
      domain="dev-02sbo7-w.us.auth0.com"
      clientId="fwXiqOHihG63vBYGPhSCMHdRjruioWVr"
      redirectUri={window.location.origin}
    >
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
