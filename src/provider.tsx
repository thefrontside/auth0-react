import React, { useEffect, useState } from 'react';
import { 
  Auth0Context,
  Auth0ProviderOptions
} from '@auth0/auth0-react';
import { read } from './storage';

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
    isAuthenticated: false,
    token: ''
  }
}

const getParam = (name: string) => (new URL(window.location.toString())).searchParams.get(name);

export const Auth0SimulationProvider = (props: Auth0SimulationProviderOptions): JSX.Element => {
  let { authorizeUri = '/authorize', redirectUri = window.location.origin } = props;
  let [ authState, setAuthState ] = useState(emptyAuthState());

  useEffect(() => {
    let { user = {}, token, code } = read();
    debugger;
    if (user && token) {
      setAuthState({isAuthenticated: true, user, token})
    } else if (getParam('code') === code) {
      setAuthState({isAuthenticated: true, user, token: code})
    }
  }, []);

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        isLoading: false,
        getAccessTokenSilently: async () => {
          return authState.token;
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
