import { atom } from 'nanostores';

interface ISign {
  email: string;
  password: string;
}

export const user = atom<ISign>({
  email: '',
  password: '',
});

export const currentUser = atom<{ email: string }>({
  email: '',
});
