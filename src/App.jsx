import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { downloadLinks, githubUrl, languages, routeMap, siteUrl } from './site-data';

const pageOrder = ['home', 'download', 'architecture', 'faq', 'privacy'];

/* ── Hooks ── */

function useTypewriter(phrases) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyPreference = () => setReducedMotion(media.matches);

    applyPreference();
    media.addEventListener('change', applyPreference);
    return () => media.removeEventListener('change', applyPreference);
  }, []);

  useEffect(() => {
    if (!phrases.length) {
      return undefined;
    }

    if (reducedMotion) {
      setDisplay(phrases[0]);
      return undefined;
    }

    const current = phrases[index % phrases.length];
    const doneTyping = display === current;
    const doneDeleting = display.length === 0;
    const delay = deleting ? 42 : doneTyping ? 1200 : 75;

    const timer = window.setTimeout(() => {
      if (!deleting && !doneTyping) {
        setDisplay(current.slice(0, display.length + 1));
        return;
      }

      if (!deleting && doneTyping) {
        setDeleting(true);
        return;
      }

      if (deleting && !doneDeleting) {
        setDisplay(current.slice(0, display.length - 1));
        return;
      }

      setDeleting(false);
      setIndex((value) => (value + 1) % phrases.length);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, display, index, phrases, reducedMotion]);

  return display;
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!elements.length) {
      return undefined;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState(null);

  const copy = useCallback(async (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch {
      setCopiedText(null);
    }
  }, []);

  return { copiedText, copy };
}

/* ── Utility ── */

function pathFor(lang, key) {
  return routeMap[lang][key];
}

function alternatePath(lang, key) {
  return lang === 'zh' ? routeMap.en[key] : routeMap.zh[key];
}

function usePageMeta(lang, key) {
  useEffect(() => {
    const data = languages[lang];
    const suffix = key === 'home' ? '' : ` | ${data.nav[key]}`;
    document.documentElement.lang = data.code;
    document.title = `${data.seo.title}${suffix}`;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', data.seo.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', document.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', data.seo.description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', key === 'home' ? data.seo.url : `${siteUrl}${pathFor(lang, key)}`);
    }
  }, [key, lang]);
}

/* ── Inline SVG Icons ── */

function PlatformIcon({ platform }) {
  const icons = {
    mac: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z" />
        <path d="M14.5 8.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5" />
        <path d="M15.5 8.5c-1.5 0-2.5 1-3.5 1s-2-1-3.5-1C7 8.5 5.5 10 5.5 12.5c0 3.5 2.5 6 4 6 1 0 1.5-.5 2.5-.5s1.5.5 2.5.5c1.5 0 4-2.5 4-6 0-2.5-1.5-4-3-4Z" />
      </svg>
    ),
    linux: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z" />
        <path d="M12 6v4l2 2" />
        <path d="M8 18c0-2 1.5-3 4-3s4 1 4 3" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    windows: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z" />
        <rect x="7" y="7" width="4" height="4" rx="0.5" />
        <rect x="13" y="7" width="4" height="4" rx="0.5" />
        <rect x="7" y="13" width="4" height="4" rx="0.5" />
        <rect x="13" y="13" width="4" height="4" rx="0.5" />
      </svg>
    ),
  };

  return <div className="card-icon">{icons[platform] || null}</div>;
}

function BentoIcon({ type }) {
  const icons = {
    agent: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="28" height="28" rx="6" />
        <circle cx="20" cy="16" r="4" />
        <path d="M12 30c0-4.418 3.582-8 8-8s8 3.582 8 8" />
      </svg>
    ),
    terminal: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="32" height="24" rx="4" />
        <polyline points="12,16 18,20 12,24" />
        <line x1="22" y1="24" x2="28" y2="24" />
      </svg>
    ),
    voice: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="15" y="6" width="10" height="18" rx="5" />
        <path d="M10 20a10 10 0 0020 0" />
        <line x1="20" y1="30" x2="20" y2="36" />
      </svg>
    ),
    gateway: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="14" />
        <line x1="6" y1="20" x2="34" y2="20" />
        <line x1="20" y1="6" x2="20" y2="34" />
        <path d="M10 10l20 20M30 10L10 30" opacity="0.4" />
      </svg>
    ),
    mcp: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="12" height="12" rx="3" />
        <rect x="22" y="6" width="12" height="12" rx="3" />
        <rect x="6" y="22" width="12" height="12" rx="3" />
        <rect x="22" y="22" width="12" height="12" rx="3" />
      </svg>
    ),
    web: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="14" />
        <ellipse cx="20" cy="20" rx="6" ry="14" />
        <line x1="6" y1="20" x2="34" y2="20" />
      </svg>
    ),
  };

  return <div className="bento-icon">{icons[type] || null}</div>;
}

/* ── Small Components ── */

function CopyButton({ text }) {
  const { copiedText, copy } = useCopyToClipboard();
  const isCopied = copiedText === text;

  return (
    <button
      className={`copy-btn${isCopied ? ' is-copied' : ''}`}
      onClick={() => copy(text)}
      type="button"
      aria-label={isCopied ? 'Copied' : 'Copy to clipboard'}
    >
      {isCopied ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      )}
    </button>
  );
}

function MagneticButton({ href, label, variant = 'primary', external = false }) {
  const [style, setStyle] = useState({});

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left - rect.width / 2) / 10;
    const offsetY = (event.clientY - rect.top - rect.height / 2) / 10;
    setStyle({ transform: `translate(${offsetX}px, ${offsetY}px)` });
  }

  function reset() {
    setStyle({});
  }

  const className = `button button-${variant}`;

  if (external) {
    return (
      <a
        className={className}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        rel="noreferrer"
        style={style}
        target="_blank"
      >
        <span>{label}</span>
      </a>
    );
  }

  return (
    <Link
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={style}
      to={href}
    >
      <span>{label}</span>
    </Link>
  );
}

function CodeBlock({ children, copyText }) {
  return (
    <div className="code-shell">
      <span className="code-shell-dot" />
      <span className="code-shell-dot" />
      <span className="code-shell-dot" />
      <code>{children}</code>
      {copyText && <CopyButton text={copyText} />}
    </div>
  );
}

function LanguageSwitch({ lang, pageKey }) {
  return (
    <NavLink
      className="language-switch"
      to={alternatePath(lang, pageKey)}
    >
      {languages[lang].switchLabel}
    </NavLink>
  );
}

/* ── Hamburger Menu ── */

function HamburgerMenu({ lang, pageKey, isOpen, onToggle }) {
  const copy = languages[lang];

  return (
    <>
      <button
        className={`hamburger${isOpen ? ' is-open' : ''}`}
        onClick={onToggle}
        type="button"
        aria-label="Toggle menu"
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>
      <div className={`mobile-nav-overlay${isOpen ? ' is-open' : ''}`}>
        {pageOrder.map((key) => (
          <NavLink
            key={key}
            className={({ isActive }) => isActive ? 'is-active' : ''}
            end={key === 'home'}
            to={pathFor(lang, key)}
            onClick={onToggle}
          >
            {copy.nav[key]}
          </NavLink>
        ))}
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          onClick={onToggle}
        >
          {copy.nav.github}
        </a>
        <NavLink
          className="mobile-nav-lang"
          to={alternatePath(lang, pageKey)}
          onClick={onToggle}
        >
          {copy.switchLabel}
        </NavLink>
      </div>
    </>
  );
}

/* ── Header ── */

function Header({ lang, pageKey }) {
  const copy = languages[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <NavLink
        className="brand"
        to={pathFor(lang, 'home')}
      >
        <span className="brand-mark">Z</span>
        <span>{copy.brandMark}</span>
      </NavLink>
      <nav className="site-nav">
        {pageOrder.map((key) => (
          <NavLink
            key={key}
            className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
            end={key === 'home'}
            to={pathFor(lang, key)}
          >
            {copy.nav[key]}
          </NavLink>
        ))}
        <a
          className="nav-link nav-external"
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          {copy.nav.github}
        </a>
      </nav>
      <LanguageSwitch
        lang={lang}
        pageKey={pageKey}
      />
      <HamburgerMenu
        lang={lang}
        pageKey={pageKey}
        isOpen={menuOpen}
        onToggle={() => setMenuOpen((v) => !v)}
      />
    </header>
  );
}

/* ── Footer ── */

function Footer({ lang }) {
  const copy = languages[lang];

  return (
    <footer className="site-footer">
      <div>
        <p className="footer-brand">ZenMind</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{copy.home.footerTagline}</p>
      </div>
      <div className="footer-meta">
        <p>
          {copy.footer.domain}: <a href={siteUrl}>{siteUrl}</a>
        </p>
        <p>
          GitHub: <a href={githubUrl}>{githubUrl}</a>
        </p>
        <p>
          {copy.footer.installLabel}:{' '}
          <a href={`${siteUrl}/install/mac.sh`}>mac.sh</a>,{' '}
          <a href={`${siteUrl}/install/linux.sh`}>linux.sh</a>,{' '}
          <a href={`${siteUrl}/install/win-wsl.sh`}>win-wsl.sh</a>
        </p>
        <p>&copy; 2026 ZenMind. {copy.footer.rights}</p>
      </div>
    </footer>
  );
}

/* ── HomePage ── */

function HomePage({ lang }) {
  const copy = languages[lang];
  const typed = useTypewriter(copy.home.typewriter);

  return (
    <>
      {/* Section 1: Hero */}
      <section className="hero section">
        <div
          className="hero-copy"
          data-reveal
        >
          <p className="eyebrow">{copy.home.eyebrow}</p>
          <h1>{copy.home.headline}</h1>
          <div className="type-line">
            <span>{typed}</span>
            <span className="type-cursor" />
          </div>
          <p className="hero-subtitle">{copy.home.subtitle}</p>
          <div className="hero-actions">
            <MagneticButton
              href={pathFor(lang, 'download')}
              label={copy.home.primaryCta}
            />
            <MagneticButton
              href={githubUrl}
              label={copy.home.secondaryCta}
              variant="secondary"
              external
            />
          </div>
          <div className="scroll-indicator">
            <div className="scroll-arrow" />
          </div>
        </div>
      </section>

      {/* Section 2: Install Commands */}
      <section className="section install-section">
        <div
          className="section-heading"
          data-reveal
        >
          <p className="section-kicker">Install</p>
          <h2>{copy.home.installTitle}</h2>
        </div>
        <div className="install-grid">
          {copy.home.installCards.map((item, i) => (
            <article
              className="glass-card install-card"
              key={item.name}
              data-reveal
              style={{ '--reveal-delay': `${i * 100}ms` }}
            >
              <PlatformIcon platform={item.platform} />
              <p className="card-title">{item.name}</p>
              <CodeBlock copyText={item.command}>{item.command}</CodeBlock>
            </article>
          ))}
        </div>
      </section>

      {/* Section 3: Bento Grid */}
      <section className="section bento-section">
        <div
          className="section-heading"
          data-reveal
        >
          <p className="section-kicker">Capabilities</p>
          <h2>{lang === 'zh' ? '模块化能力，灵活组合。' : 'Modular capabilities, flexible composition.'}</h2>
        </div>
        <div className="bento-grid">
          {copy.home.bentoFeatures.map((feature, i) => (
            <article
              className={`glass-card bento-card${feature.span === 2 ? ' span-2' : ''}`}
              key={feature.title}
              data-reveal
              style={{ '--reveal-delay': `${i * 80}ms` }}
            >
              <BentoIcon type={feature.icon} />
              <p className="card-title">{feature.title}</p>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Section 4: Showcase */}
      <section className="section showcase-section">
        <div
          className="section-heading"
          data-reveal
        >
          <p className="section-kicker">Preview</p>
          <h2>{copy.home.showcaseTitle}</h2>
        </div>
        <div
          className="showcase-frame"
          data-reveal
        >
          <div className="showcase-play">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
          <p>{copy.home.showcasePlaceholder}</p>
        </div>
        <div
          className="stats-row"
          data-reveal
        >
          {copy.home.stats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: CTA Strip */}
      <section className="cta-strip" data-reveal>
        <h2>{copy.home.ctaTitle}</h2>
        <MagneticButton
          href={pathFor(lang, 'download')}
          label={copy.home.ctaButton}
        />
        <p className="cta-links">
          {lang === 'zh' ? '或直接访问 ' : 'Or visit '}
          <a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a>
        </p>
      </section>
    </>
  );
}

/* ── DownloadPage ── */

function DownloadPage({ lang }) {
  const copy = languages[lang];

  return (
    <section className="section page-section">
      <div
        className="page-header"
        data-reveal
      >
        <p className="section-kicker">Download</p>
        <h1>{copy.download.title}</h1>
        <p>{copy.download.intro}</p>
      </div>
      <div className="card-grid download-list">
        {copy.download.sections.map((section) => (
          <article
            className="glass-card download-card"
            key={section.title}
            data-reveal
          >
            <p className="card-title">{section.title}</p>
            <p className="card-subtitle">{section.subtitle}</p>
            <CodeBlock copyText={section.command}>{section.command}</CodeBlock>
            <ul className="bullet-list">
              {section.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="card-grid dual">
        <article
          className="glass-card mobile-card"
          data-reveal
        >
          <p className="card-title">{copy.download.mobileTitle}</p>
          <div className="mobile-grid">
            {copy.download.mobileCards.map((card) => (
              <div
                className="mobile-item"
                key={card.platform}
              >
                <div className="card-row">
                  <p style={{ margin: 0 }}>{card.platform}</p>
                  <span className="chip chip-muted">{card.status}</span>
                </div>
                <p>{card.detail}</p>
                {downloadLinks[card.hrefKey] ? (
                  <a
                    className="text-link"
                    href={downloadLinks[card.hrefKey]}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {card.cta}
                  </a>
                ) : (
                  <span className="text-link">{card.cta}</span>
                )}
              </div>
            ))}
          </div>
        </article>
        <article
          className="glass-card mobile-card"
          data-reveal
        >
          <p className="card-title">{copy.download.sourceTitle}</p>
          <p>{copy.download.sourceBody}</p>
          <div className="hero-actions" style={{ justifyContent: 'flex-start' }}>
            <MagneticButton
              href={githubUrl}
              label={copy.nav.github}
              external
            />
          </div>
        </article>
      </div>
    </section>
  );
}

/* ── ArchitecturePage ── */

function ArchitecturePage({ lang }) {
  const copy = languages[lang];

  return (
    <section className="section page-section">
      <div
        className="page-header"
        data-reveal
      >
        <p className="section-kicker">System</p>
        <h1>{copy.architecture.title}</h1>
        <p>{copy.architecture.intro}</p>
      </div>
      <div className="card-grid architecture-columns">
        {copy.architecture.columns.map((column) => (
          <article
            className="glass-card info-card"
            key={column.title}
            data-reveal
          >
            <p className="card-title">{column.title}</p>
            <p>{column.body}</p>
          </article>
        ))}
      </div>
      <article
        className="glass-card timeline-card"
        data-reveal
      >
        <p className="card-title">{copy.architecture.timelineTitle}</p>
        <div className="timeline">
          {copy.architecture.timeline.map((item, index) => (
            <div
              className="timeline-step"
              key={item}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

/* ── FaqPage ── */

function FaqPage({ lang }) {
  const copy = languages[lang];

  return (
    <section className="section page-section">
      <div
        className="page-header"
        data-reveal
      >
        <p className="section-kicker">FAQ</p>
        <h1>{copy.faq.title}</h1>
        <p>{copy.faq.intro}</p>
      </div>
      <div className="faq-list">
        {copy.faq.items.map((item) => (
          <details
            className="glass-card faq-item"
            key={item.question}
            data-reveal
          >
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ── PrivacyPage ── */

function PrivacyPage({ lang }) {
  const copy = languages[lang];

  return (
    <section className="section page-section">
      <div
        className="page-header"
        data-reveal
      >
        <p className="section-kicker">Privacy</p>
        <h1>{copy.privacy.title}</h1>
        <p>{copy.privacy.intro}</p>
      </div>
      <article
        className="glass-card privacy-card"
        data-reveal
      >
        <ul className="bullet-list">
          {copy.privacy.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}

/* ── Layout & Routing ── */

function PageLayout({ lang, pageKey, children }) {
  useRevealOnScroll();
  usePageMeta(lang, pageKey);

  return (
    <div className="app-shell">
      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />
      <Header
        lang={lang}
        pageKey={pageKey}
      />
      <main className="content-shell">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}

function RoutedPage({ lang, pageKey }) {
  const pages = {
    home: <HomePage lang={lang} />,
    download: <DownloadPage lang={lang} />,
    architecture: <ArchitecturePage lang={lang} />,
    faq: <FaqPage lang={lang} />,
    privacy: <PrivacyPage lang={lang} />,
  };

  return (
    <PageLayout
      lang={lang}
      pageKey={pageKey}
    >
      {pages[pageKey]}
    </PageLayout>
  );
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  const routes = useMemo(
    () => [
      { path: '/', lang: 'zh', key: 'home' },
      { path: '/download', lang: 'zh', key: 'download' },
      { path: '/architecture', lang: 'zh', key: 'architecture' },
      { path: '/faq', lang: 'zh', key: 'faq' },
      { path: '/privacy', lang: 'zh', key: 'privacy' },
      { path: '/en', lang: 'en', key: 'home' },
      { path: '/en/download', lang: 'en', key: 'download' },
      { path: '/en/architecture', lang: 'en', key: 'architecture' },
      { path: '/en/faq', lang: 'en', key: 'faq' },
      { path: '/en/privacy', lang: 'en', key: 'privacy' },
    ],
    [],
  );

  return (
    <>
      <ScrollToTop />
      <Routes>
        {routes.map((route) => (
          <Route
            element={
              <RoutedPage
                key={`${route.lang}-${route.key}`}
                lang={route.lang}
                pageKey={route.key}
              />
            }
            key={route.path}
            path={route.path}
          />
        ))}
        <Route
          element={
            <RoutedPage
              lang="zh"
              pageKey="home"
            />
          }
          path="*"
        />
      </Routes>
    </>
  );
}

export default App;
