const STORAGE_KEY = '@frontside/auth0-react';

export const merge = (overwrite: object) => {
  let data = {};
  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '')
  } catch { }
  write({
    ...data,
    ...overwrite
  })
}

export const write = (obj: object) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

interface Auth0StorageContent {
  user?: Record<string, unknown>;
  token?: string;
  code?: string;
}

export function read(): Auth0StorageContent {
  let data = {};

  try {
    data = JSON.parse(`${localStorage.getItem(STORAGE_KEY)}`) || {};
  } catch { }

  return data;
}