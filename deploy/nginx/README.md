# ZenMind Nginx Deployment

`[zenmind.cc.conf](/Users/linlay/Project/zenmind/zenmind-website/deploy/nginx/zenmind.cc.conf)` is the production reference config for the public website.

## Assumptions

- Canonical domain: `https://www.zenmind.cc`
- Redirects:
  - `http://zenmind.cc` -> `https://www.zenmind.cc`
  - `http://www.zenmind.cc` -> `https://www.zenmind.cc`
  - `https://zenmind.cc` -> `https://www.zenmind.cc`
- Built site root on server: `/var/www/zenmind.cc/current/dist`
- Certbot certificate path:
  - `/etc/letsencrypt/live/www.zenmind.cc/fullchain.pem`
  - `/etc/letsencrypt/live/www.zenmind.cc/privkey.pem`

## Suggested publish flow

1. Build locally or on the server with `npm install` and `npm run build`.
2. Upload `dist/` to `/var/www/zenmind.cc/current/dist`.
3. Prepare release artifacts under `/docker/zenmind-releases`.
4. Copy the nginx config into your enabled site config path, for example `/etc/nginx/conf.d/zenmind.cc.conf`.
5. Make sure `/.well-known/acme-challenge/` points to `/var/www/_letsencrypt`.
6. Run `nginx -t` and reload nginx.

## Special routes

- `/assets/*`: immutable static asset cache
- `/install/*.sh`: shell bootstrap scripts, intentionally uncached
- `/install/manifest.json`: stable release manifest served from `/docker/zenmind-releases/manifest.json`
- `/install/releases/*`: release line manifests and patch artifacts served from `/docker/zenmind-releases/`
- `/api/*`: returns `404` because the root domain is website-only
- All other routes: SPA fallback to `index.html`
