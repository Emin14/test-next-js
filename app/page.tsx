import Header from './components/Header/Header';
import Posts from './components/Posts/Posts';
import Pagination from './components/Pagination/Pagination';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Posts />
        <Pagination />
      </main>
    </>
  );
}
