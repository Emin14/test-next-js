'use client';
import { useStore } from '@nanostores/react';
import { pages, activePage } from '../../stores/page';
import styles from './pagination.module.scss';

export default function Pagination() {
  const $pages = useStore(pages);
  const $activePage = useStore(activePage);

  return (
    <div className={styles.pages}>
      {$pages.map((page) => (
        <span
          key={page}
          className={
            $activePage === page
              ? [styles.active, styles.pageCount].join(' ')
              : styles.pageCount
          }
          onClick={() => activePage.set(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
}
