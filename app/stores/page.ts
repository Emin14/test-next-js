import { atom } from 'nanostores';

export const paginationPages = atom<number[]>([]);

export const activePage = atom<number>(1);
