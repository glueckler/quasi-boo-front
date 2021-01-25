import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { PostInterface } from '../types/PostInterface';

import { CONTENT_API_PATH, BLOG_URL, CONTENT_API_KEY } from '../utils/urls';

async function getPosts() {
  const fields = 'fields=title,slug';
  const url = `${BLOG_URL}/${CONTENT_API_PATH}/posts/?key=${CONTENT_API_KEY}&${fields}`;
  const res = await fetch(url).then((res) => res.json());

  return res.posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    revalidate: 60,
    props: { posts },
  };
};

const Home: React.FC<{ posts: PostInterface[] }> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>quasi boo :)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ul>
        {posts.map(({ title, slug }) => (
          <li key={slug}>
            <Link href="/post/[slug]" as={`/post/${slug}`}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
