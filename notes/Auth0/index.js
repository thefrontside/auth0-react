import { Auth0Provider } from "@auth0/auth0-react";
import { default as MockAuthProvider } from './Provider';
import { ENABLE_SIMULATION } from './config';

const AuthProvider = ENABLE_SIMULATION ? MockAuthProvider : Auth0Provider;

export default AuthProvider;