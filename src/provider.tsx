import React from 'react';
import { 
  Auth0Provider as AuthProvider, 
  Auth0ProviderOptions
} from '@auth0/auth0-react';

const TestableAuth0Provider = (props: Auth0ProviderOptions): JSX.Element => {
  return (
    <div>
      hello
      {props.children}
    </div>
  )
};

export const Auth0Provider =  process.env.REACT_APP_SIMULATION_ENABLE ? TestableAuth0Provider : AuthProvider;
