import { User, schemaUser } from '../types/data';

export async function getUser(id: number): Promise<User[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users?id=${id}`,
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const result = await res.json();
  return schemaUser.array().parseAsync(result);
}
