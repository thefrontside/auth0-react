import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0SimulationProvider, checkAuth0Simulation } from '../src';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
      
const Page = () => {
  let {
    isAuthenticated,
    // error,
    // isLoading,
    // getAccessTokenSilently,
    // getAccessTokenWithPopup,
    // getIdTokenClaims,
    loginWithRedirect,
    // loginWithPopup,
    logout
  } = useAuth0();

  return isAuthenticated ? (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      logout
    </button>
  ) : (
    <div>
      <p>user is not authenticated</p>
      <button onClick={loginWithRedirect}>login with redirect</button>
    </div>
  )
};

const App = () => {
  if(checkAuth0Simulation()){
    return (
      <Auth0SimulationProvider>
        <Page />
      </Auth0SimulationProvider>
    )
  } else {
    return (
      <Auth0Provider
        domain="dev-02sbo7-w.us.auth0.com"
        clientId="fwXiqOHihG63vBYGPhSCMHdRjruioWVr"
        redirectUri={window.location.origin}
      >
        <Page />
      </Auth0Provider>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);