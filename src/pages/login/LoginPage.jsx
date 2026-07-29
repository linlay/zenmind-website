import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { languages } from '../../content';
import { apiBase, apiRequest } from '../../shared/api';
import { Icon } from '../../shared/components/Icon';
import { pathFor } from '../../shared/routing';

function safeReturnTo(value) {
  if (!value || !value.startsWith('/') || value.startsWith('//') || /[\r\n\\]/.test(value)) {
    return '';
  }
  return value;
}

function SignedInPanel({ lang, auth }) {
  const copy = languages[lang];
  const user = auth.user;

  return (
    <article className="login-form content-card login-minimal-card signed-in-panel">
      <span className="status-pill status-ready">{copy.login.signedIn}</span>
      <h2>{copy.login.welcome}</h2>
      <dl>
        <div>
          <dt>{copy.login.accountLabel}</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>{copy.login.roleLabel}</dt>
          <dd>{user.role}</dd>
        </div>
        <div>
          <dt>{copy.login.providerLabel}</dt>
          <dd>{user.authProvider}</dd>
        </div>
      </dl>
      {auth.error ? <p className="login-error">{auth.error}</p> : null}
      <div className="login-panel-actions">
        <a className="button button-primary" href={pathFor(lang, 'profile')} rel="noopener noreferrer" target="_blank">
          <span>{copy.login.profileCta}</span>
          <Icon type="external" />
        </a>
        <Link className="button button-secondary" to={pathFor(lang, 'home')}>
          <span>{copy.login.homeCta}</span>
          <Icon type="arrow" />
        </Link>
        <button className="button button-secondary" type="button" onClick={auth.logout}>
          <span>{copy.login.logout}</span>
        </button>
      </div>
    </article>
  );
}

export function LoginPage({ lang, auth }) {
  const copy = languages[lang];
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const returnTo = useMemo(() => safeReturnTo(new URLSearchParams(window.location.search).get('return_to')), []);

  const googleURL = `${apiBase}/auth/google/start?return_to=${encodeURIComponent(returnTo || pathFor(lang, 'profile'))}`;

  useEffect(() => {
    if (auth.user && returnTo) {
      window.location.replace(returnTo);
    }
  }, [auth.user, returnTo]);

  const sendCode = async () => {
    setError('');
    setSending(true);
    try {
      await apiRequest('/auth/email-code/start', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setCodeSent(true);
    } catch (err) {
      setError(err.message || copy.login.errorFallback);
    } finally {
      setSending(false);
    }
  };

  const verifyCode = async (event) => {
    event.preventDefault();
    setError('');
    setVerifying(true);
    try {
      const data = await apiRequest('/auth/email-code/verify', {
        method: 'POST',
        body: JSON.stringify({ email, code }),
      });
      auth.setUser(data.user);
      window.location.assign(returnTo || pathFor(lang, 'profile'));
    } catch (err) {
      setError(err.message || copy.login.errorFallback);
    } finally {
      setVerifying(false);
    }
  };

  if (auth.user) {
    if (returnTo) {
      return null;
    }
    return (
      <section className="page-section login-page auth-page login-atmosphere">
        <div className="login-minimal-shell" data-reveal>
          <SignedInPanel auth={auth} lang={lang} />
        </div>
      </section>
    );
  }

  const disabled = auth.loading || sending || verifying;
  return (
    <section className="page-section login-page auth-page login-atmosphere">
      <div className="login-minimal-shell" data-reveal>
        <article className="login-form content-card login-entry-panel login-minimal-card">
          <div>
            <span className="card-kicker">{copy.login.eyebrow}</span>
            <h1>{copy.login.title}</h1>
            <p>{copy.login.intro}</p>
          </div>

          <a className="button button-primary google-submit" href={googleURL}>
            <span>{copy.login.googleSubmit}</span>
            <Icon type="external" />
          </a>

          <div className="login-divider" aria-hidden="true">
            <span />
            {copy.login.separator}
            <span />
          </div>

          <form className="email-code-form" onSubmit={verifyCode}>
            <label>
              <span>{copy.login.emailLabel}</span>
              <input
                autoComplete="email"
                disabled={disabled}
                inputMode="email"
                name="email"
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <div className="login-code-row">
              <label>
                <span>{copy.login.codeLabel}</span>
                <input
                  autoComplete="one-time-code"
                  disabled={disabled || !codeSent}
                  inputMode="numeric"
                  maxLength={6}
                  name="code"
                  pattern="[0-9]{6}"
                  placeholder={copy.login.codePlaceholder}
                  required
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                />
              </label>
              <button className="button button-secondary login-code-button" disabled={disabled || !email} type="button" onClick={sendCode}>
                {sending ? copy.login.sendingCode : codeSent ? copy.login.resendCode : copy.login.sendCode}
              </button>
            </div>
            {codeSent ? <p className="login-hint">{copy.login.codeSent}</p> : null}
            {error ? <p className="login-error">{error}</p> : null}
            <button className="button button-primary login-submit" disabled={disabled || !email || code.length !== 6} type="submit">
              <span>{verifying ? copy.login.verifyingCode : copy.login.verifySubmit}</span>
              <Icon type="arrow" />
            </button>
          </form>

          <p className="sso-login-note">{copy.login.sessionBody}</p>
        </article>
      </div>
    </section>
  );
}
