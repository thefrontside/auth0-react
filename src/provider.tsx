import React, { useEffect, useState } from 'react';
import { 
  Auth0Context,
  Auth0ProviderOptions
} from '@auth0/auth0-react';

interface Auth0SimulationProviderOptions {
  children?: React.ReactNode;
  authorizeUri?: string;
  redirectUri?: Auth0ProviderOptions['redirectUri'];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUser?(token: string): Promise<unknown>;
}

function emptyAuthState(){
  return {
    user: {},
    isAuthenticated: false
  }
}

export const Auth0SimulationProvider = (props: Auth0SimulationProviderOptions): JSX.Element => {
  let { authorizeUri = '/authorize', redirectUri = window.location.origin } = props;
  let [ authState, setAuthState ] = useState(emptyAuthState());

  useEffect(() => {
    let auth0 = JSON.parse(`${localStorage.getItem('@frontside/auth0-react')}`) ?? emptyAuthState();
    setAuthState(auth0);
  }, []);

  // pressing submit = takes user and password and turn into token

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
          if(authorizeUri){
            window.location.assign(`${authorizeUri}?redirect_uri=${redirectUri}`);
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
