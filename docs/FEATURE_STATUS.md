# Feature status

| Feature | Status | Notes |
|---|---|---|
| Catalogue, categories, search, sort, size variants, quick add | **Works (client-side)** | Price sort appears only once prices exist |
| Shopping bag (add/remove/quantity/change size/subtotal/persistence) | **Works (browser localStorage)** | Per device and browser; not synced |
| Bag drawer, mobile menu, search dialog, toasts, sticky mobile buy bar | **Works** | Keyboard and screen-reader support |
| Peanut Atelier recommendations | **Works (client-side)** | Based on product data, no taste claims |
| Build Your Fauzey Box | **Works (client-side)** | Adds the chosen items to the bag; box pricing awaiting configuration |
| Journal, Story, Gifts pages | **Static content** | Edit `lib/data/journal.ts` |
| Contact / corporate enquiry / newsletter | **Static, no server** | Produce a ready-to-send email or WhatsApp message; nothing is received by the site |
| Checkout | **Demonstration only** | Validates details; creates an *order request* to send by WhatsApp/email; no payment, no order record |
| Prices | **Awaiting configuration** | Add to `lib/data/prices.ts` |
| Product photography | **Awaiting files** | See `docs/IMAGES.md` |
| **Secure payments (Paystack, Mobile Money, cards)** | **Needs backend** | `PaymentService` adapter ready; provider code must run server-side |
| **Customer accounts / login** | **Needs backend** | Not present; no fake login |
| **Order persistence, order tracking, emails** | **Needs backend** | Orders are not stored anywhere |
| **Live inventory / reservations** | **Needs backend** | Types exist in `lib/domain/types.ts` |
| **Server-side price & discount validation** | **Needs backend** | Browser prices are display-only |
| **Admin dashboard** | **Needs backend** | Data structures are modular; static hosting cannot secure an admin |
| **Reviews, wishlist, loyalty, analytics** | **Not built** | Analytics adapter is a no-op; no reviews are fabricated |
