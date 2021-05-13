import Link from 'next/link';

export const SiteFooter = () => {
  return (
    <footer className="site-footer outer">
      <div className="site-footer-content inner">
        <section className="copyright">dean glü © 2021</section>
        <nav className="site-footer-nav">
          <a href="https://quasiglu.com">Latest Posts</a>
          <a
            href="https://www.facebook.com/ghost"
            target="_blank"
            rel="noopener"
          >
            Facebook
          </a>
        </nav>
      </div>
    </footer>
  );
};
