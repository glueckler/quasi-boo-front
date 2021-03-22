import Link from 'next/link';

export const MenuBar = () => {
  return (
    <div className="header">
      <div className="header-inner">
        <div className="header-logo">quasi glü</div>
        <Link href="/">
          <a className="header-link">Home</a>
        </Link>
      </div>
    </div>
  );
};
