import Link from 'next/link';

export const SiteFooter = () => {
  return (
    <footer className="site-footer outer">
      <div className="site-footer-content inner">
        <section className="copyright">dean glü © 2021</section>
        <nav className="site-footer-nav">
          <Link href="/">
            <a>Latest Posts</a>
          </Link>
          <a href="https://github.com/glueckler" target="_blank" rel="noopener">
            Github
          </a>
          <a href="https://deanglueckler.com" target="_blank" rel="noopener">
            About me
          </a>
        </nav>
      </div>
    </footer>
  );
};
