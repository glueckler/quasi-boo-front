import Link from 'next/link';

export const PostFooter = () => {
  return (
    <footer className="post-footer">
      <Link href="/">
        <a>Homepage</a>
      </Link>
    </footer>
  );
};
