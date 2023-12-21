export async function singIn(email: string, password: string) {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res;
}
