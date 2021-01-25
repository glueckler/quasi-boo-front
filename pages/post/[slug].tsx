import Link from 'next/link';
import { useRouter } from 'next/router';
import { CONTENT_API_PATH, BLOG_URL, CONTENT_API_KEY } from '../../utils/urls';
import styles from '../../styles/Home.module.css';
import { PostInterface } from '../../types/PostInterface';

// see posts api return
// https://ghost.org/docs/content-api/#posts

async function getPost(slug: string) {
  const url = `${BLOG_URL}/${CONTENT_API_PATH}/posts/slug/${slug}/?key=${CONTENT_API_KEY}`;
  const res = await fetch(url).then((res) => res.json());

  return res.posts[0];
}

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);

  return {
    revalidate: 60,
    props: { post },
  };
};

export const getStaticPaths = () => {
  // this works with the router code inside the component
  return {
    paths: [],
    fallback: true,
  };
};

const Post: React.FC<{ post: PostInterface }> = ({ post }) => {
  // this router code works with getStaticProps
  // in prod it should only load once and then generate a file
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading..</h1>;
  }

  const { title, html } = post;

  return (
    <div className={styles.container}>
      <Link href="/">
        <a>Go back</a>
      </Link>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
};

export default Post;
