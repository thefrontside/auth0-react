export function authenticateUser<SessionData>(session: SessionData) {
  localStorage.setItem('@frontside/auth0-react', JSON.stringify({
    session,
    isAuthenticated: true
  }))
};
