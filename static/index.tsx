import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '../src/provider';
import { useAuth0 } from '@auth0/auth0-react';
      
const Page = () => {
  let {
    isAuthenticated,
    user,
    // error, isLoading,
    // getAccessTokenSilently, getAccessTokenWithPopup, getIdTokenClaims, loginWithRedirect, loginWithPopup, logout
  } = useAuth0();

  return isAuthenticated ? (
    <p>hello {user.firstName} {user.lastName}</p>
  ) : (
    <p>user is not authenticated</p>
  )
};

const App = () => {
  return (
    <Auth0Provider
      domain="dev-02sbo7-w.us.auth0.com"
      clientId="fwXiqOHihG63vBYGPhSCMHdRjruioWVr"
      redirectUri={window.location.origin}
      simulation={process.env.REACT_APP_SIMULATION_ENABLE}
    >
      <Page />
    </Auth0Provider>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);