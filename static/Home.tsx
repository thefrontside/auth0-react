import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const Home = () => {
  let {
    isAuthenticated,
    // error,
    // isLoading,
    getAccessTokenSilently,
    // getAccessTokenWithPopup,
    // getIdTokenClaims,
    loginWithRedirect,
    // loginWithPopup,
    logout,
    user
  } = useAuth0();

  let token = async () => await getAccessTokenSilently();

  return isAuthenticated ? (
    <>
      <h1>Hello {user.name}</h1>
      <span>User Token is {token}</span>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        logout
      </button>
    </>
  ) : (
    <>
      <p>user is not authenticated</p>
      <button onClick={loginWithRedirect}>login with redirect</button>
    </>
  );
};
