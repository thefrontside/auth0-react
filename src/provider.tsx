import React, { useEffect, useState } from 'react';
import { 
  Auth0Context
} from '@auth0/auth0-react';

interface Auth0SimulationProviderOptions {
  children?: React.ReactNode;
  authorizeURL?: string;
}

function emptyAuthState(){
  return {
    user: {},
    isAuthenticated: false
  }
}

export const Auth0SimulationProvider = (props: Auth0SimulationProviderOptions): JSX.Element => {
  let { authorizeURL = '/authorize' } = props;
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
        getAccessTokenSilently: async () => {
          return 'my-token';
        },
        getAccessTokenWithPopup: () => {
          throw new Error('Not yet implemented');
        },
        getIdTokenClaims: () => {
          throw new Error('Not yet implemented');
        },
        loginWithRedirect: async () => {
          if(authorizeURL){
            window.location.pathname = authorizeURL;
          }
        },
        loginWithPopup: () => {
          throw new Error('Not yet implemented');
        },
        logout: () => {
          setAuthState(emptyAuthState())
        },
      }}
    >
      {props.children}
    </Auth0Context.Provider>
  )
};
