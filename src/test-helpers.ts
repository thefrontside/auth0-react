import { v4 as uuidv4 } from 'uuid';
import { merge } from './storage';

export const AuthorizeAuth0 = (user: Record<string, unknown>) => () => {
  let token = uuidv4();
  merge({ token, user });
  return { token };
}