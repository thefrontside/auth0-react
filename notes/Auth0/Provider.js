import React, { useEffect, useState } from 'react';
import AuthenticationContext from './context';

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    return {
      isAuthenticated: true,
      isLoading: false,
      user: null,
      async getAccessTokenSilently() {
        return 'my-token';
      },
      async getAccessTokenWithPopup() {
        return 'my-token';
      },
      async getIdTokenClaims() {
        const payload = {
          name: "user's name",
        };

        return {
          __raw: JSON.stringify(payload),
          ...payload,
        };
      },
      async loginWithRedirect() {},
      async loginWithPopup() {},
      logout() {
        setAuthState({ ...authState, isAuthenticated: false });
      },
    };
  });

  const _getUser = async () => {
    const data = await fetch('/oauth/token', {
      method: 'POST',
    });
    const parsed = await data.json();
    if (!parsed) return parsed;
    const { user } = parsed;
    return user;
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await _getUser();
        setAuthState({ ...authState, user });
      } catch (error) {
        console.error('Error during User fetch:', error);
      }
    })();
  }, []);

  return (
    <AuthenticationContext.Provider value={authState}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthProvider;
