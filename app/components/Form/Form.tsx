'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@nanostores/react';
import { user, currentUser } from '../../stores/user';
import { singIn } from '../../utils/singIn';
import styles from './form.module.scss';

export default function Form() {
  const router = useRouter();
  const $user = useStore(user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ($user.email && $user.password) {
      singIn($user.email, $user.password)
        .then(() => {
          currentUser.set({ email: $user.email });
          router.push('/');
          user.set({
            email: '',
            password: '',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const setUser = (e: React.FormEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    user.set({
      ...$user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Войти</h2>
      <label htmlFor="email" className={styles.label}>
        <input
          placeholder="Email"
          id="email"
          name="email"
          onChange={setUser}
          value={$user.email}
        />
      </label>
      <label htmlFor="password" className={styles.label}>
        <input
          id="password"
          placeholder="Password"
          name="password"
          onChange={setUser}
          value={$user.password}
        />
      </label>
      <button type="submit" className={styles.button}>
        Войти
      </button>
      <Link href="/" className={styles.link}>
        На главную
      </Link>
    </form>
  );
}
