export const apiBase = import.meta.env.VITE_API_BASE || '/api';

export async function apiRequest(path, options = {}) {
  const requestOptions = { ...options };
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (options.csrf) {
    const csrfResponse = await fetch(`${apiBase}/auth/csrf`, {
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });
    const csrfData = await csrfResponse.json().catch(() => ({}));
    if (!csrfResponse.ok || !csrfData.csrfToken) {
      throw new Error(csrfData.error?.message || 'Unable to verify the current session.');
    }
    headers['X-CSRF-Token'] = csrfData.csrfToken;
  }
  delete requestOptions.csrf;

  const response = await fetch(`${apiBase}${path}`, {
    credentials: 'include',
    headers,
    ...requestOptions,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error?.message || data.message || 'Request failed.';
    throw new Error(message);
  }

  return data;
}
