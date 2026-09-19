# PhzarKhmer Frontend

Vue 3 single-page application for the PhzarKhmer / GEO KHM system administration interface.

![PhzarKhmer logo](src/assets/logo.png)

## Overview

This repository contains the frontend only. It is built with Vue CLI and communicates with the backend through the API URL configured in `VUE_APP_URL`. The production build is a collection of static files generated in the `dist/` directory, so it can be served by Nginx, Apache, a CDN, or a static hosting provider.

### Main technologies

- Vue 3
- Vue Router 4
- Vuex and Pinia for state management
- Axios for HTTP requests
- Bootstrap / BootstrapVue, Element Plus, PrimeVue, Oruga, and other UI libraries
- SCSS/CSS
- Vue CLI 5 and Webpack

## Requirements

Install the following before starting development:

- Node.js 18 LTS or another version supported by the installed Vue CLI dependencies
- npm 8 or newer (or Yarn if you prefer)
- Access to the backend API used by the selected environment

Check your versions:

```bash
node --version
npm --version
```

## Get the source code

Clone the repository and switch to the development branch:

```bash
git clone https://github.com/panhaoeun/PROJECT_FRONT_END_GEO_KHM.git
cd PROJECT_FRONT_END_GEO_KHM
git checkout DEV_MS_LOCATION_SYSTEM_ADMIN
```

## Configuration

Create a local `.env` file in the project root. Do not commit credentials, private keys, database passwords, or OAuth secrets.

For local development, use values similar to the following and replace them with the correct values for your environment:

```dotenv
VUE_APP_NAME=PhzarKhmer
VUE_APP_URL=http://localhost:3000/api
VUE_APP_PATH_FILE=http://localhost:3000/
VUE_APP_KEY=
```

For the production build, configure the production API and file service URLs before running the build:

```dotenv
VUE_APP_NAME=PhzarKhmer
VUE_APP_URL=https://api.example.com/api
VUE_APP_PATH_FILE=https://api.example.com/
VUE_APP_KEY=
```

`VUE_APP_*` variables are embedded into the browser bundle at build time. Changing `.env` after `npm run build` does not change an already-created `dist/` directory; rebuild the application after changing them.

> **Security:** Environment variables beginning with `VUE_APP_` are public in a client-side application. Never put database passwords, JWT signing secrets, OAuth client secrets, or other server-only secrets in this frontend repository or in a `VUE_APP_*` variable. Keep those values in the backend's secret manager and rotate any credentials that may previously have been committed.

Supported Vue CLI environment files include `.env`, `.env.local`, `.env.development`, `.env.production`, and their `.local` variants. Local variants should remain uncommitted.

## Install dependencies

Use the lockfile so that installations are reproducible:

```bash
npm ci
```

If the lockfile must be regenerated because dependencies changed, use:

```bash
npm install
```

Do not commit `node_modules/` or the generated `dist/` directory.

## Development

Start the Vue development server with hot reload:

```bash
npm run serve
```

Open the URL printed by the command, normally:

```text
http://localhost:8080
```

The development server proxies requests beginning with `/api` to the host configured in `VUE_APP_URL` through `vue.config.js`. Ensure the backend is running and that its CORS/authentication configuration allows the frontend origin.

Stop the server with `Ctrl+C`.

## Quality checks

Run the linter before submitting changes:

```bash
npm run lint
```

The lint command may offer to fix automatically fixable issues. Review all changes before committing.

## Build for production

1. Check out the exact release commit or branch.
2. Create the production `.env` file or set the production environment values in the deployment system.
3. Install dependencies with the lockfile.
4. Run the production build:

```bash
npm ci
npm run lint
npm run build
```

The optimized static files are written to `dist/`. Test the generated files locally before uploading them:

```bash
npx serve -s dist
```

Then open the URL shown by `serve`. The `-s` option enables SPA fallback, which is required when directly opening Vue Router URLs.

## Deploy to production

### Generic static hosting

Upload the **contents** of `dist/` to the document root of the hosting provider. Do not upload `src/`, `node_modules/`, or the repository's `.env` file. Configure the hosting provider to:

- Serve `index.html` for unknown application routes (SPA fallback).
- Use HTTPS.
- Route `/api` to the backend only if the hosting architecture requires a reverse proxy.
- Allow the production frontend origin in the backend CORS configuration.

### Nginx example

After building, copy `dist/` to a directory such as `/var/www/phzarkhmer` and use a server block similar to this:

```nginx
server {
    listen 80;
    server_name app.example.com;

    root /var/www/phzarkhmer;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: proxy API calls through the same domain.
    # Keep the backend URL and credentials on the server, not in the frontend.
    location /api/ {
        proxy_pass https://api.example.com/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable HTTPS with your organization's certificate or a trusted certificate provider, validate the Nginx configuration, and reload it:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Deployment checklist

- [ ] The production API URL is correct and uses HTTPS.
- [ ] No secrets are present in `.env`, the bundle, or browser-visible configuration.
- [ ] `npm ci`, `npm run lint`, and `npm run build` completed successfully.
- [ ] The `dist/` directory was uploaded to the correct web root.
- [ ] SPA fallback to `index.html` is configured.
- [ ] Backend CORS, authentication, uploads, and API health checks work from the production domain.
- [ ] Browser developer tools show no failed API requests or mixed-content errors.
- [ ] The previous release can be restored if the smoke test fails.

## Common problems

### API requests fail locally

Confirm `VUE_APP_URL` is correct, the backend is reachable, and the backend allows requests from `http://localhost:8080`. Restart `npm run serve` after changing `.env`.

### API requests still use an old URL after deployment

The API URL is compiled into the bundle. Update the environment value and run `npm run build` again, then redeploy all files in `dist/`.

### Refreshing a route returns 404

Configure the web server's SPA fallback so unknown routes return `index.html`. For Nginx, use `try_files $uri $uri/ /index.html;`.

### Assets are missing after deployment

Deploy the complete contents of `dist/`, preserve its directory structure, and confirm the site is served from the base path expected by the Vue CLI configuration.

## Available npm scripts

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the locked dependency tree |
| `npm run serve` | Start the development server with hot reload |
| `npm run build` | Create the optimized production bundle in `dist/` |
| `npm run lint` | Check and optionally fix lint issues |

## Related documentation

- [Vue CLI configuration](https://cli.vuejs.org/config/)
- [Vue CLI mode and environment variables](https://cli.vuejs.org/guide/mode-and-env.html)
- [Vue Router](https://router.vuejs.org/)
- [Vue Horizontal](https://vue-horizontal.fuxing.dev/installation)
- [GitArt Scroll Carousel](https://gitart-scroll-carousel.gitart.org/)
- [Vue Telephone Input](https://vue-tel-input.iamstevendao.com/documentation/)
- [Maz UI](https://louismazel.github.io/maz-ui-3/components/maz-phone-number-input#frontmatter-title)
