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
  getUser?(code?: string): Promise<Record<string, unknown>>;
}

function emptyAuthState(): Auth0SimulationProviderState {
  return {
    user: {},
    isAuthenticated: false,
    token: '',
    // @see: https://github.com/auth0/auth0-react/blob/master/src/auth-state.tsx#L18
    // In SSR mode the library will never check the session, so loading should be initialised as false
    isLoading: typeof window !== 'undefined',
  }
}

const getParam = (name: string) => (new URL(window.location.toString())).searchParams.get(name);

const defaultGetUser = async (): Promise<Record<string, unknown>> => {
  let data = await fetch('/oauth/token', {
    method: 'POST',
  });
  let parsed = await data.json();
  if (!parsed) return parsed;
  let { user } = parsed;
  return user;
}

interface Auth0SimulationProviderState {
  user: Record<string, unknown>;
  isAuthenticated: boolean;
  token?: string;
  isLoading?: boolean;
}

export const Auth0SimulationProvider = (props: Auth0SimulationProviderOptions): JSX.Element => {
  let { authorizeUri = '/authorize', redirectUri = window.location.origin, getUser = defaultGetUser } = props;
  let [ authState, setAuthState ] = useState<Auth0SimulationProviderState>(emptyAuthState());

  useEffect(() => {
    let { user = {}, token, code } = read();
    if (user && token) {
      setAuthState({isAuthenticated: true, user, token, isLoading: false})
    } else if (getParam('code') === code) {
      if (user) {
        setAuthState({isAuthenticated: true, user, token: code, isLoading: false})
      } else {
        (async () => {
          let user = await getUser();
          setAuthState({isAuthenticated: true, user, token: code, isLoading: false})
        })();
        setAuthState({ isLoading: true, isAuthenticated: false, user })
      }
    }
  }, []);

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        isLoading: !!authState.isLoading,
        getAccessTokenSilently: async () => {
          return authState.token || '';
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
