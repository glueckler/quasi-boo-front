import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { CONTENT_API_PATH, BLOG_URL, CONTENT_API_KEY } from '../../utils/urls';
import { PostInterface } from '../../types/PostInterface';
import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { Interface } from 'readline';
import { TagInterface } from '../../types/TagInterface';
import { Loading } from '../../components/loading';

// see posts api return
// https://ghost.org/docs/content-api/#posts

async function getPost(slug: string) {
  const url = `${BLOG_URL}/${CONTENT_API_PATH}/posts/slug/${slug}/?key=${CONTENT_API_KEY}&include=tags`;
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
    return <Loading />;
  }

  let visibleTags: TagInterface[] = [];
  if (post.tags) {
    visibleTags = post.tags.filter(({ visibility }) => {
      return visibility === 'public';
    });
  }

  const {
    title,
    html,
    primary_tag: primaryTag,
    custom_excerpt: customExcerpt,
  } = post;

  return (
    <>
      <SiteHeader postTitle={title} />
      <main id="site-main" className="site-main outer site-header-margin">
        <div className="inner">
          <article className="post-full post">
            <header className="post-full-header">
              <h1 className="post-full-title">{title}</h1>
              {primaryTag && (
                <section className="post-full-tags">
                  <Link href={`/tag/${primaryTag.slug}`}>
                    <a>{primaryTag.name}</a>
                  </Link>
                </section>
              )}
              {customExcerpt && (
                <p className="post-full-custom-excerpt">{customExcerpt}</p>
              )}
            </header>
            <section className="post-full-content">
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default Post;
