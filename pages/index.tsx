import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import classNames from 'classnames';
import { PostInterface } from '../types/PostInterface';
import styles from '../styles/Home.module.scss';

import { CONTENT_API_PATH, BLOG_URL, CONTENT_API_KEY } from '../utils/urls';
import { PostList } from '../components/post-list';
import React from 'react';
import { SiteFooter } from '../components/site-footer';

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
      <React.Fragment key={font}>
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
      </React.Fragment>
    ))}
  </>
);

const Home: React.FC<{ posts: PostInterface[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>quasi glü</title>
        <link rel="icon" href="/favicon.ico" />
        {fontPreloader(['Futura-Bold', 'Futura-Black-Bold'])}
      </Head>
      <div className={classNames(styles.container, 'home-container')}>
        <div className={styles.main}>
          <h1 className={styles.header}>quasi glü</h1>

          <PostList posts={posts} />
        </div>
      </div>
      <footer className="site-footer outer">
        <div
          className={classNames(
            styles.footerInner,
            'site-footer-content',
            'inner'
          )}
        >
          <nav className="site-footer-nav">
            <a
              href="https://github.com/glueckler"
              target="_blank"
              rel="noopener"
            >
              Github
            </a>
            <a href="https://deanglueckler.com" target="_blank" rel="noopener">
              About me
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Home;
