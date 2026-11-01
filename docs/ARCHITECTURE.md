# Architecture

Principle (from the supplied blueprints): **Luxury in the interface. Simplicity in the infrastructure.**

## Static-export constraints (honoured)

- No API routes, middleware, server actions, `next/image` optimisation, ISR or cookies-based sessions.
- Dynamic routes (`/products/[slug]`, `/shop/[category]`, `/journal/[slug]`) use `generateStaticParams` with `dynamicParams = false`.
- Anything that needs runtime data is a client component reading `localStorage` or the URL query: the bag, `/shop/?q=`, and `/order/?ref=` (order numbers cannot be static routes).
- `sitemap.xml` and `robots.txt` are generated statically (`force-static`).

## Layers

```
UI (components/)  →  domain logic (lib/commerce, lib/validation)  →  data (lib/data)  →  adapters (lib/payments, lib/analytics)
```

UI never contains pricing, payment or inventory rules. Business rules are pure functions with unit tests (`tests/`).

## Key modules

| Module | Responsibility |
|---|---|
| `lib/data/image-manifest.ts` | The supplied filenames, parsed into product code / size / suffix |
| `lib/data/catalogue.ts` | Builds Products and Variants (SKU, sizes, images) from the manifest + product seeds + prices |
| `lib/data/prices.ts` | **The only place prices live.** Empty until Fauzey supplies them |
| `lib/data/images.ts` + `scripts/scan-images.mjs` | Resolve manifest stems to real files; missing files fall back to a designed placeholder |
| `lib/commerce/bag.ts` | Bag reducer + summary; never persists prices, only `variantId` and `quantity` |
| `lib/commerce/recommend.ts` | Atelier scoring (one point per matched preference) |
| `lib/payments/*` | `PaymentService` interface; Demo/Paystack/MobileMoney providers all return `unavailable` |
| `lib/orders.ts` | Builds a demonstration **order request** (WhatsApp/email text); stored only in the browser |
| `lib/domain/types.ts` | Domain types, including future backend contracts (Inventory, Customer, Order, Promotion, GiftBox) |

## Checkout safety

`CHECKOUT_MODE` defaults to `demo`. Even if set to `live`, the UI blocks submission unless **every bag line has a configured price
and the payment provider reports `isLive`**. No provider is live in this repository, so a payable order can never be created by
accident. No secrets exist or may exist in this codebase; anything `NEXT_PUBLIC_*` is public.

## Path to a real backend (not built, by design)

Keep the static storefront on GitHub Pages and add a separate Cloudflare Worker (or any server) that exposes the API in
Blueprint §18, re-validates price/stock/discounts server-side, holds the Paystack secret, receives webhooks, and persists
orders and inventory. Then implement `PaymentService.createPayment` against that Worker. The storefront changes are confined
to `lib/payments/` and the final step of `CheckoutFlow`.
