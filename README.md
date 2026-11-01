# Fauzey Peanut

A premium Ghanaian peanut and peanut-butter house, as a fast, accessible, fully static storefront.
**Brand statement:** *The craft of the humble nut.*

- **Stack:** Next.js 15 (App Router, static export), React 19, TypeScript, Tailwind CSS 3, Framer Motion, Lucide.
- **Hosting:** GitHub Pages only. Live URL: `https://GITHUB_USERNAME.github.io/fauzey-peanut/`
- **Checkout:** a clearly labelled *demonstration*. No payment is taken and no order is stored. See [docs/FEATURE_STATUS.md](docs/FEATURE_STATUS.md).

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000  (no base path in dev)
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Scans images, builds the static site into `out/` (base path `/fauzey-peanut`) |
| `npm run preview` | Serves `out/` exactly as GitHub Pages does, at `http://localhost:4173/fauzey-peanut/` |
| `npm run typecheck` / `lint` / `test` | TypeScript, ESLint, unit tests (Vitest) |
| `npm run scan:images` | Detects which product photographs exist in `public/images/products/` |
| `npm run images:report -- <folder>` | **Report-only** plan for organising original photos (moves nothing) |
| `npm run images:variants` | Optional: creates responsive WebP variants (needs `npm i -D sharp`) |

## Build and test the production site locally

```bash
npm run build
npm run preview      # open http://localhost:4173/fauzey-peanut/
```

## Deploy (GitHub Pages)

Full steps and exact Git commands: **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

## Documentation

- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md): publishing to GitHub Pages, exact Git commands, troubleshooting
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): structure, static-export constraints, adapters, future backend
- [docs/PRODUCT_DATA.md](docs/PRODUCT_DATA.md): how to edit products, sizes, prices and label data; assumptions to confirm
- [docs/IMAGES.md](docs/IMAGES.md): the image manifest, filename rules, and the report-before-move workflow
- [docs/FEATURE_STATUS.md](docs/FEATURE_STATUS.md): what works locally, what is static, what needs a backend

## Project layout

```
app/                 routes (static export)
components/          brand, navigation, commerce, atelier, gifts, editorial, checkout, forms, ui, providers
lib/config/          site, contact and commerce configuration
lib/data/            products, categories, prices, image manifest, journal
lib/commerce/        bag reducer, search/sort, Atelier recommendations, order state machine
lib/payments/        PaymentService adapter + Paystack / Mobile Money placeholders
lib/validation/      checkout and enquiry validation (Ghana phone numbers, regions)
scripts/             image scan, preview server, image report, variant generator
public/images/products/   product photography goes here
.github/workflows/deploy.yml   build + deploy to GitHub Pages
```

## Licence

See [LICENSE](LICENSE). It is a placeholder (all rights reserved) with a recommendation.
# fsg
