import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import classNames from 'classnames';
import { PostInterface } from '../types/PostInterface';
import styles from '../styles/Home.module.scss';

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

const fontPreloader = (fonts) => (
  <>
    {fonts.map((font) => (
      <>
        <link
          rel="preload"
          href={`/fonts/futura/${font}.woff2`}
          as="font"
          crossOrigin=""
        ></link>
        <link
          rel="preload"
          href={`/fonts/futura/${font}.woff`}
          as="font"
          crossOrigin=""
        ></link>
      </>
    ))}
  </>
);

const Home: React.FC<{ posts: PostInterface[] }> = ({ posts }) => {
  return (
    <div className={classNames(styles.container, 'home-container')}>
      <Head>
        <title>quasi glü</title>
        <link rel="icon" href="/favicon.ico" />
        {fontPreloader(['Futura-Bold', 'Futura-Black-Bold'])}
      </Head>

      <div className={styles.header}>
        <Image
          src="/img/quasi-logo-md.png"
          alt="quasi glu logo"
          layout="fill"
          objectFit="cover"
        />
      </div>

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
