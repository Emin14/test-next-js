import { IPost } from '../types/data';

export async function getPost(id: string): Promise<IPost> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
