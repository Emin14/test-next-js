import { Post, schemaPost } from '../types/data';

export async function getAllPost(): Promise<Post[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const result = await res.json();
  return schemaPost.array().parseAsync(result);
}
