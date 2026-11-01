# Deployment: GitHub Pages (only)

GitHub Pages is the only approved host. No other provider is configured. No paid plan or payment card is needed:
GitHub Free supports Pages for **public** repositories.

Final URL: `https://GITHUB_USERNAME.github.io/fauzey-peanut/`

## What is already configured

| Requirement | Where |
|---|---|
| `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true` | `next.config.mjs` |
| Base path `/fauzey-peanut` in production builds | `next.config.mjs` (`NEXT_PUBLIC_BASE_PATH`) |
| Static output in `out/` | `npm run build` |
| `.nojekyll` | `public/.nojekyll` (copied to `out/`) |
| Workflow: build on push to `main`, upload `out/`, deploy | `.github/workflows/deploy.yml` |
| Permissions `contents: read, pages: write, id-token: write` and the `github-pages` environment | workflow |
| Site URL derived from the repository owner | workflow sets `NEXT_PUBLIC_SITE_URL` |

Every internal link uses `next/link` (base-path aware); CSS, JS, fonts and the icon are emitted under
`/fauzey-peanut/_next/…`; product photographs go through `assetPath()` in `lib/utils/assets.ts`.

## Publishing: exact commands (run only when you decide to publish)

Nothing has been pushed or created on GitHub. When you are ready:

1. On GitHub, create a **public**, **empty** repository named `fauzey-peanut` (do not add a README, .gitignore or licence there).
2. In your project folder:

```bash
cd fauzey-peanut
git init -b main
git add .
git commit -m "Initial Fauzey Peanut storefront"
git remote add origin https://github.com/GITHUB_USERNAME/fauzey-peanut.git
git push -u origin main
```

   Replace `GITHUB_USERNAME` with your GitHub username. (With the GitHub CLI you can instead run
   `gh repo create fauzey-peanut --public --source=. --remote=origin --push`.)

3. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions** (one time).
4. Open the **Actions** tab. The *Deploy to GitHub Pages* workflow runs on the push; when green, the site is live at
   `https://GITHUB_USERNAME.github.io/fauzey-peanut/`.

Later updates: commit and `git push`. Every push to `main` redeploys.

## Before and after publishing: checks

```bash
npm ci && npm run typecheck && npm run lint && npm test
npm run build && npm run preview     # http://localhost:4173/fauzey-peanut/
```

After deployment, open the live URL on a phone and a desktop and check: home, a product page, adding to bag, the
bag drawer, checkout (demonstration banner visible), and a made-up URL (should show the Fauzey 404 page).

## Troubleshooting

- **Page is blank or unstyled:** the base path is wrong. The repository must be named `fauzey-peanut`. If you rename it, change the base path in `next.config.mjs`, `deploy.yml` and `.env.example`.
- **Workflow fails at "Deploy":** Pages source is not set to *GitHub Actions* (step 3).
- **404 for `/products/...` directly:** make sure the URL ends with `/` or follows a link; the site uses `trailingSlash`.
- **Custom domain later:** set `NEXT_PUBLIC_BASE_PATH=` (empty) and `NEXT_PUBLIC_SITE_URL=https://your-domain` in the workflow; `robots.txt` and the sitemap then become effective at the domain root.
- **robots.txt:** crawlers only read `/robots.txt` at a domain root, so on `github.io/fauzey-peanut/` it is informational.
