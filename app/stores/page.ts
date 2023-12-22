import { atom } from 'nanostores';

export const pages = atom<number[]>([]);

export const activePage = atom<number>(1);
