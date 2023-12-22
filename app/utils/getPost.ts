import { Post, schemaPost } from '../types/data';

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const result = await res.json();
  return schemaPost.parse(result);
}
