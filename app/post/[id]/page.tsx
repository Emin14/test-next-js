import Link from 'next/link';
import { Metadata } from 'next';
import { MdOutlineComment } from 'react-icons/md';
import { getPost } from '../../utils/getPost';
import { getComments } from '../../utils/getComments';
import { getUser } from '../../utils/getUser';
import styles from './page.module.scss';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.id);
  return {
    title: post.title,
    description: post.body,
  };
}

export default async function Post({ params }: Props) {
  const post = await getPost(params.id);
  const comments = await getComments(params.id);
  const user = await getUser(post.userId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.author}>
          <span>author: </span>
          <span>{user[0].username}</span>
        </div>
        <Link href="/" className={styles.button}>
          Назад
        </Link>
      </div>
      <div className={styles.post}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.description}>{post.body}</p>
      </div>
      <p className={styles.text}>comments:</p>
      <ul className={styles.comments}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.comment}>
            <div>
              <span>email: </span>
              <span>{comment.email}</span>
            </div>
            <div>
              <span>title: </span>
              <span>{comment.name}</span>
            </div>
            <div>
              <span>text: </span>
              <span>{comment.body}</span>
            </div>
            <MdOutlineComment className={styles.MdOutlineComment} />
          </li>
        ))}
      </ul>
    </div>
  );
}