import { Post, schemaPost } from '../types/data';

export async function getPosts(page: number, limit: number): Promise<Post[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const result = await res.json();
  return schemaPost.array().parseAsync(result);
}
