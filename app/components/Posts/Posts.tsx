'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { getPosts } from '../../utils/getPosts';
import { getAllPost } from '../../utils/getAllPost';
import { paginationPages, activePage } from '../../stores/paginationPage';
import { Post } from '../../types/data';
import styles from './posts.module.css';

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const $activePage = useStore(activePage);
  const limitPosts = 8;

  useEffect(() => {
    getAllPost()
      .then((response) => {
        const pagesCount = Math.ceil(response.length / limitPosts);
        const pagesArray = Array(pagesCount)
          .fill('')
          .map((_, i) => i + 1);
        paginationPages.set(pagesArray);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getPosts($activePage, limitPosts)
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => console.log(error));
  }, [$activePage]);

  return (
    <ul className={styles.posts}>
      {posts.map((post) => (
        <li className={styles.post} key={post.id}>
          <Link href={`/post/${post.id}`}>
            <article>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.body}>{post.body}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}
