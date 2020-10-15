const STORAGE_KEY = '@frontside/auth0-react';

// FIX: this shouldn't be any here
const merge = (overwrite: any) => {
  let data = {};
  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '')
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...data,
    overwrite
  }));
}

export function authenticateUser<User>(user?: User) {
  merge({
    user: user ? user : {},
    isAuthenticated: true
  })
  
};

export function setUserToken(token: string) {
  merge({
    token
  })
}
