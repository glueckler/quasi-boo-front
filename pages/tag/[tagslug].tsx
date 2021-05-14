import { useRouter } from 'next/router';
import { Loading } from '../../components/loading';
import { PostList } from '../../components/post-list';
import { PostInterface } from '../../types/PostInterface';
import { TagInterface } from '../../types/TagInterface';
import { CONTENT_API_PATH, BLOG_URL, CONTENT_API_KEY } from '../../utils/urls';

async function getTag(tagslug: string) {
  const tagUrl = `${BLOG_URL}/${CONTENT_API_PATH}/tags/slug/${tagslug}/?key=${CONTENT_API_KEY}`;

  const fields = 'fields=title,slug';
  const postsUrl = `${BLOG_URL}/${CONTENT_API_PATH}/posts/?key=${CONTENT_API_KEY}&filter=tag:${tagslug}&${fields}`;

  const tagRes = await fetch(tagUrl).then((res) => res.json());
  const postRes = await fetch(postsUrl).then((res) => res.json());

  return { tag: tagRes.tags[0], posts: postRes.posts };
}

export const getStaticProps = async ({ params }) => {
  const { tag, posts } = await getTag(params.tagslug);

  return {
    revalidate: 60,
    props: { tag, posts },
  };
};

export const getStaticPaths = () => {
  // this works with the router code inside the component
  return {
    paths: [],
    fallback: true,
  };
};

const Tag: React.FC<{ tag: TagInterface; posts: PostInterface[] }> = ({
  tag,
  posts,
}) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading />;
  }

  // const { tag } = tag;
  return <PostList posts={posts} />;
};

export default Tag;
