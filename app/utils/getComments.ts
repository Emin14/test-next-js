import { Comment, schemaComment } from '../types/data';

export async function getComments(id: string): Promise<Comment[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const result = await res.json();
  return schemaComment.array().parseAsync(result);
}
