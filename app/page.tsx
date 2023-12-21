'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { getPosts } from './utils/getPosts';
import { getAllPost } from './utils/getAllPost';
import { currentUser } from './stores/user';
import { IPost } from './types/data';
import styles from './page.module.scss';

export default function Home() {
  const $currentUser = useStore(currentUser);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [pages, setPages] = useState<number[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const limitPosts = 8;

  useEffect(() => {
    getAllPost()
      .then((response) => {
        const pagesCount = Math.ceil(response.length / limitPosts);
        const pagesArray = Array(pagesCount)
          .fill('')
          .map((_, i) => i + 1);
        setPages(pagesArray);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getPosts(activePage, limitPosts)
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => console.log(error));
  }, [activePage]);

  const logOut = () => {
    currentUser.set({ email: '' });
  };

  return (
    <>
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
      <main className={styles.main}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className={styles.post}
            >
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.body}>{post.body}</p>
            </Link>
          ))}
        </div>
        <div className={styles.pages}>
          {pages.map((page) => (
            <span
              key={page}
              className={
                activePage === page
                  ? [styles.active, styles.pageCount].join(' ')
                  : styles.pageCount
              }
              onClick={() => setActivePage(page)}
            >
              {page}
            </span>
          ))}
        </div>
      </main>
    </>
  );
}