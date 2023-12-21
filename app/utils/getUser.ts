import { IUser } from '../types/data';

export async function getUser(id: number): Promise<IUser[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users?id=${id}`,
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
