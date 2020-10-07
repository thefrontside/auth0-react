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

const ENABLE_SIMULATION = !'process.env.REACT_APP_SIMULATION_ENABLE';

export const Auth0Provider =  ENABLE_SIMULATION ? TestableAuth0Provider : AuthProvider;
