'use client';
import Link from 'next/link';
import { useStore } from '@nanostores/react';
import { currentUser } from '../../stores/user';
import styles from './header.module.scss';

export default function Header() {
  const $currentUser = useStore(currentUser);

  const logOut = () => {
    currentUser.set({ email: '' });
  };

  return (
    <header className={styles.header}>
      {$currentUser.email && (
        <>
          <span onClick={logOut} className={styles.link}>
            Выйти
          </span>
          <span>Добро пожаловать: {$currentUser.email}</span>
        </>
      )}
      {!$currentUser.email && (
        <Link href="/signin" className={styles.link}>
          Войти
        </Link>
      )}
      <span className={styles.author}>Application by Emin</span>
    </header>
  );
}
