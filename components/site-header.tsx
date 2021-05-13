import Link from 'next/link';

export const SiteHeader = ({ postTitle }) => {
  return (
    <header className="site-header">
      <div className="outer site-nav-main">
        <div className="inner">
          <nav className="site-nav">
            <div className="site-nav-left">
              <Link href="/">
                <div className="site-nav-logo cursor-pointer">dean glü</div>
              </Link>
              <div className="site-nav-content">
                <ul className="nav" role="menu">
                  <li role="menuitem">
                    <Link href="/">
                      <a>Posts</a>
                    </Link>
                  </li>
                </ul>
                <span className="nav-post-title">{postTitle}</span>
              </div>
            </div>
            <div className="site-nav-right">
              <a
                className="social-link social-link-fb"
                href="https://www.facebook.com/ghost"
                title="Facebook"
                target="_blank"
                rel="noopener"
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm5.204 4.911h-3.546c-2.103 0-4.443.885-4.443 3.934.01 1.062 0 2.08 0 3.225h-2.433v3.872h2.509v11.147h4.61v-11.22h3.042l.275-3.81h-3.397s.007-1.695 0-2.187c0-1.205 1.253-1.136 1.329-1.136h2.054V4.911z"></path>
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
