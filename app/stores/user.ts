import { atom } from 'nanostores';

export const user = atom({
  email: '',
  password: '',
});

export const currentUser = atom({
  email: '',
});
