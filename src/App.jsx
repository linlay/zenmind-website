import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { externalLinks, githubUrl, installEntries, languages, routeMap, siteUrl } from './site-data';

const pageOrder = ['home', 'download', 'faq', 'privacy'];

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
      if (navigator.clipboard?.writeText) {
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
      window.setTimeout(() => setCopiedText(null), 1800);
    } catch {
      setCopiedText(null);
    }
  }, []);

  return { copiedText, copy };
}

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

function PlatformIcon({ platform }) {
  const icons = {
    mac: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z" />
        <path d="M14.2 8.2c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3" />
        <path d="M15.4 9c-1.1 0-2 .8-2.7.8S11 9 9.9 9C8 9 6.6 10.7 6.6 12.8c0 3 2.1 5.6 3.7 5.6.8 0 1.4-.4 2.4-.4s1.6.4 2.4.4c1.6 0 3.7-2.6 3.7-5.6 0-2.1-1.4-3.8-3.4-3.8Z" />
      </svg>
    ),
    linux: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="10" r="3" />
        <path d="M8 18c0-2 1.7-3.3 4-3.3S16 16 16 18" />
        <path d="M12 7v1.5" />
      </svg>
    ),
    windows: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5.5 10.5 4v7H3v-5.5Z" />
        <path d="M13.5 3.6 21 2.5V11h-7.5V3.6Z" />
        <path d="M3 13h7.5v7L3 18.5V13Z" />
        <path d="M13.5 13H21v8.5L13.5 20V13Z" />
      </svg>
    ),
  };

  return <div className="card-icon">{icons[platform]}</div>;
}

function FeatureIcon({ type }) {
  const icons = {
    assistant: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="24" height="24" rx="8" />
        <circle cx="20" cy="18" r="4" />
        <path d="M14 28c1.6-3.3 4.3-5 6-5s4.4 1.7 6 5" />
      </svg>
    ),
    privacy: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4 6 10v10c0 9.3 6 16 14 18 8-2 14-8.7 14-18V10L20 4Z" />
        <path d="M15 20l3 3 7-7" />
      </svg>
    ),
    workflow: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 12h10" />
        <path d="M22 12h10" />
        <path d="M18 8l4 4-4 4" />
        <rect x="8" y="22" width="10" height="10" rx="3" />
        <rect x="22" y="22" width="10" height="10" rx="3" />
        <path d="M18 27h4" />
      </svg>
    ),
  };

  return <div className="feature-icon">{icons[type]}</div>;
}

function CopyButton({ text, lang }) {
  const { copiedText, copy } = useCopyToClipboard();
  const copyText = languages[lang].shared;
  const isCopied = copiedText === text;

  return (
    <button
      className={`copy-btn${isCopied ? ' is-copied' : ''}`}
      type="button"
      aria-label={isCopied ? copyText.copiedLabel : copyText.copyLabel}
      onClick={() => copy(text)}
    >
      {isCopied ? copyText.copiedLabel : copyText.copyLabel}
    </button>
  );
}

function CodeBlock({ children, copyText, lang }) {
  return (
    <div className="code-shell">
      <code>{children}</code>
      <CopyButton text={copyText} lang={lang} />
    </div>
  );
}

function ButtonLink({ href, label, variant = 'primary', external = false }) {
  const className = `button button-${variant}`;

  if (external) {
    return (
      <a className={className} href={href} rel="noreferrer" target="_blank">
        {label}
      </a>
    );
  }

  return (
    <Link className={className} to={href}>
      {label}
    </Link>
  );
}

function LanguageSwitch({ lang, pageKey }) {
  return (
    <NavLink className="language-switch" to={alternatePath(lang, pageKey)}>
      {languages[lang].switchLabel}
    </NavLink>
  );
}

function Header({ lang, pageKey }) {
  const copy = languages[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <NavLink className="brand" to={pathFor(lang, 'home')}>
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
        <a className="nav-link nav-external" href={githubUrl} rel="noreferrer" target="_blank">
          {copy.nav.github}
        </a>
      </nav>

      <div className="header-actions">
        <LanguageSwitch lang={lang} pageKey={pageKey} />
        <button
          className={`hamburger${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      <div className={`mobile-nav-overlay${menuOpen ? ' is-open' : ''}`}>
        {pageOrder.map((key) => (
          <NavLink
            key={key}
            className={({ isActive }) => `mobile-link${isActive ? ' is-active' : ''}`}
            end={key === 'home'}
            to={pathFor(lang, key)}
          >
            {copy.nav[key]}
          </NavLink>
        ))}
        <a className="mobile-link" href={githubUrl} rel="noreferrer" target="_blank">
          {copy.nav.github}
        </a>
        <NavLink className="mobile-link mobile-nav-lang" to={alternatePath(lang, pageKey)}>
          {copy.switchLabel}
        </NavLink>
      </div>
    </header>
  );
}

function Footer({ lang }) {
  const copy = languages[lang];
  const shared = copy.shared;

  return (
    <footer className="site-footer">
      <div className="footer-branding">
        <p className="footer-brand">ZenMind</p>
        <p className="footer-tagline">{copy.home.footerTagline}</p>
      </div>
      <div className="footer-meta">
        <p>
          {copy.footer.domain}: <a href={siteUrl}>{siteUrl}</a>
        </p>
        <p>
          GitHub: <a href={externalLinks.github}>{externalLinks.github}</a>
        </p>
        <p>
          {shared.deployDocs}: <a href={externalLinks.deployDocs}>{externalLinks.deployDocs}</a>
        </p>
        <p>&copy; 2026 ZenMind. {copy.footer.rights}</p>
      </div>
    </footer>
  );
}

function InstallCard({ entry, lang, compact = false }) {
  const localized = entry[lang];
  const shared = languages[lang].shared;

  return (
    <article className={`glass-card install-card${compact ? ' is-compact' : ''}`} data-reveal>
      <div className="card-topline">
        <PlatformIcon platform={entry.key} />
        <div>
          <p className="card-title">{entry.name}</p>
          <p className="card-summary">{localized.summary}</p>
        </div>
      </div>
      <CodeBlock copyText={entry.command} lang={lang}>
        {entry.command}
      </CodeBlock>
      <ul className="bullet-list">
        {localized.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <a className="text-link" href={entry.docsHref} rel="noreferrer" target="_blank">
        {shared.openDocs}
      </a>
    </article>
  );
}

function HomePage({ lang }) {
  const copy = languages[lang];
  const kickers = copy.kickers;

  return (
    <>
      <section className="hero section">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">{copy.home.eyebrow}</p>
          <h1>{copy.home.headline}</h1>
          <p className="hero-subtitle">{copy.home.subtitle}</p>
          <div className="hero-actions">
            <ButtonLink href={pathFor(lang, 'download')} label={copy.home.primaryCta} />
            <ButtonLink href={externalLinks.github} label={copy.home.secondaryCta} variant="secondary" external />
          </div>
        </div>

        <div className="hero-panel glass-card" data-reveal>
          <div className="section-heading hero-panel-heading">
            <p className="section-kicker">{copy.shared.installKicker}</p>
            <h2>{copy.home.installTitle}</h2>
            <p>{copy.home.installBody}</p>
          </div>
          <div className="install-grid">
            {installEntries.map((entry) => (
              <InstallCard entry={entry} key={entry.key} lang={lang} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">{kickers.features}</p>
          <h2>{copy.home.featuresTitle}</h2>
          {copy.home.featuresBody ? <p>{copy.home.featuresBody}</p> : null}
        </div>
        <div className="feature-grid">
          {copy.home.featureHighlights.map((feature) => (
            <article className="glass-card feature-card" key={feature.title} data-reveal>
              <FeatureIcon type={feature.key} />
              <p className="card-title">{feature.title}</p>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">{kickers.quickStart}</p>
          <h2>{copy.home.quickTitle}</h2>
          {copy.home.quickBody ? <p>{copy.home.quickBody}</p> : null}
        </div>
        <div className="steps-grid">
          {copy.home.quickSteps.map((step, index) => (
            <article className="glass-card step-card" key={step.title} data-reveal>
              <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
              <p className="card-title">{step.title}</p>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-strip glass-card" data-reveal>
        <div>
          <p className="section-kicker">{kickers.next}</p>
          <h2>{copy.home.ctaTitle}</h2>
          <p>{copy.home.ctaBody}</p>
        </div>
        <div className="cta-actions">
          <ButtonLink href={pathFor(lang, 'download')} label={copy.home.ctaPrimary} />
          <ButtonLink href={externalLinks.deployDocs} label={copy.home.ctaSecondary} variant="secondary" external />
        </div>
      </section>
    </>
  );
}

function DownloadPage({ lang }) {
  const copy = languages[lang];
  const shared = copy.shared;
  const kickers = copy.kickers;

  return (
    <section className="section page-section">
      <div className="page-header" data-reveal>
        <p className="section-kicker">{kickers.download}</p>
        <h1>{copy.download.title}</h1>
        <p>{copy.download.intro}</p>
      </div>

      <section className="section-block">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">{shared.installKicker}</p>
          <h2>{copy.download.installTitle}</h2>
          {copy.download.installBody ? <p>{copy.download.installBody}</p> : null}
        </div>
        <div className="install-grid install-grid-wide">
          {installEntries.map((entry) => (
            <InstallCard entry={entry} key={entry.key} lang={lang} />
          ))}
        </div>
      </section>

      <div className="card-grid dual">
        <article className="glass-card info-panel" data-reveal>
          <p className="card-title">{copy.download.notesTitle}</p>
          <ul className="bullet-list">
            {copy.download.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>

        <article className="glass-card info-panel" data-reveal>
          <p className="card-title">{copy.download.linksTitle}</p>
          {copy.download.linksBody ? <p>{copy.download.linksBody}</p> : null}
          <div className={`link-stack${copy.download.linksBody ? '' : ' is-compact'}`}>
            <a className="text-link" href={externalLinks.deployDocs} rel="noreferrer" target="_blank">
              {shared.deployDocs}
            </a>
            <a className="text-link" href={externalLinks.deployRepo} rel="noreferrer" target="_blank">
              {shared.deployRepo}
            </a>
            <a className="text-link" href={externalLinks.github} rel="noreferrer" target="_blank">
              {shared.sourceRepo}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

function FaqPage({ lang }) {
  const copy = languages[lang];
  const kickers = copy.kickers;

  return (
    <section className="section page-section">
      <div className="page-header" data-reveal>
        <p className="section-kicker">{kickers.faq}</p>
        <h1>{copy.faq.title}</h1>
        <p>{copy.faq.intro}</p>
      </div>
      <div className="faq-list">
        {copy.faq.items.map((item) => (
          <details className="glass-card faq-item" key={item.question} data-reveal>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function PrivacyPage({ lang }) {
  const copy = languages[lang];
  const kickers = copy.kickers;

  return (
    <section className="section page-section">
      <div className="page-header" data-reveal>
        <p className="section-kicker">{kickers.privacy}</p>
        <h1>{copy.privacy.title}</h1>
        <p>{copy.privacy.intro}</p>
      </div>
      <article className="glass-card info-panel" data-reveal>
        <ul className="bullet-list">
          {copy.privacy.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function PageLayout({ lang, pageKey, children }) {
  useRevealOnScroll();
  usePageMeta(lang, pageKey);

  return (
    <div className="app-shell">
      <Header lang={lang} pageKey={pageKey} />
      <main className="content-shell">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}

function RoutedPage({ lang, pageKey }) {
  const pages = {
    home: <HomePage lang={lang} />,
    download: <DownloadPage lang={lang} />,
    faq: <FaqPage lang={lang} />,
    privacy: <PrivacyPage lang={lang} />,
  };

  return (
    <PageLayout lang={lang} pageKey={pageKey}>
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
      { path: '/faq', lang: 'zh', key: 'faq' },
      { path: '/privacy', lang: 'zh', key: 'privacy' },
      { path: '/en', lang: 'en', key: 'home' },
      { path: '/en/download', lang: 'en', key: 'download' },
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
            key={`${route.lang}-${route.key}`}
            path={route.path}
            element={<RoutedPage lang={route.lang} pageKey={route.key} />}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
