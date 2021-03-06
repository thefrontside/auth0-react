export function authenticateUser<SessionData>(user: SessionData) {
  localStorage.setItem('@frontside/auth0-react', JSON.stringify({
    user,
    isAuthenticated: true
  }))
};
