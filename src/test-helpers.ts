import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = '@frontside/auth0-react';

// FIX: this shouldn't be any here
const merge = (overwrite: any) => {
  let data = {};
  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '')
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...data,
    ...overwrite
  }));
}

export const AuthorizeAuth0 = (user: Record<string, unknown>) => () => {
  let token = uuidv4();
  merge({ token, user });
  return { token };
}