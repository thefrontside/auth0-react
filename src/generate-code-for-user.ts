import { v4 as uuidv4 } from 'uuid';
import { write } from './storage';

export const generateCodeForUser = (user: Record<string, unknown>) => {
  let code = uuidv4();
  write({code, user});
  return code;
}