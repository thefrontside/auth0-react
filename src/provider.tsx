import React, { useEffect, useState } from 'react';
import { 
  Auth0Context,
  Auth0Provider as AuthProvider, 
  Auth0ProviderOptions
} from '@auth0/auth0-react';

function emptyAuthState(){
  return {
    user: {},
    isAuthenticated: false
  }
}

const TestableAuth0Provider = (props: Auth0ProviderOptions): JSX.Element => {
  let [ authState, setAuthState ] = useState(emptyAuthState());

  useEffect(() => {
    let auth0 = JSON.parse(`${localStorage.getItem('@frontside/auth0-react')}`) || emptyAuthState();
    setAuthState(auth0);
  }, []);

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        isLoading: false,
        getAccessTokenSilently: () => {
          throw new Error('Not yet implemented');
        },
        getAccessTokenWithPopup: () => {
          throw new Error('Not yet implemented');
        },
        getIdTokenClaims: () => {
          throw new Error('Not yet implemented');
        },
        loginWithRedirect: () => {
          throw new Error('Not yet implemented');
        },
        loginWithPopup: () => {
          throw new Error('Not yet implemented');
        },
        logout: () => {
          throw new Error('Not yet implemented');
        },
      }}
    >
      {props.children}
    </Auth0Context.Provider>
  )
};

const parseBoolean = (str = '') => str.toLowerCase() === 'true';
export const Auth0Provider =  parseBoolean(process.env.REACT_APP_SIMULATION) ? TestableAuth0Provider : AuthProvider;
