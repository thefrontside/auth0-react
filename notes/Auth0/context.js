import { createContext } from 'react';

export default createContext({
  isAuthenticated: false,
  isLoading: true,
  setIsAuthenticated: (payload) => payload,
  loginWithRedirect: () => new Promise((resolve) => resolve),
  logout: () => new Promise((resolve) => resolve),
  restoreSession: () => new Promise((resolve) => resolve),
  getAccessTokenSilently: () => new Promise((resolve) => resolve),
  getIdTokenClaims: () => new Promise((resolve) => resolve),
  user: null,
});
