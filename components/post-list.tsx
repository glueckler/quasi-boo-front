import Link from 'next/link';
import { PostInterface } from '../types/PostInterface';

export const PostList: React.FC<{ posts: PostInterface[] }> = ({ posts }) => {
  return (
    <ul>
      {posts.map(({ title, slug }) => (
        <li key={slug}>
          <Link href="/post/[slug]" as={`/post/${slug}`}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
