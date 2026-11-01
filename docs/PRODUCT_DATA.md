# Product data

## Where things live

| To change… | Edit |
|---|---|
| Prices (GHS) | `lib/data/prices.ts`, keyed by SKU, e.g. `'FZY-PB-500G': 55` |
| Product names, copy, label fields, Atelier tags | `lib/data/products.ts` |
| Categories | `lib/data/categories.ts` |
| Sizes and which photographs belong to which size | `lib/data/image-manifest.ts` (filenames) |
| Contact details, WhatsApp number | `lib/config/site.ts` |
| Journal articles | `lib/data/journal.ts` |

## SKUs

`FZY-<CODE>-<SIZE>`, e.g. `FZY-PB-500G`, `FZY-CLPM-1KG`. These are provisional internal identifiers, not supplied by Fauzey.
Sizes are the ones that appear in the supplied photograph filenames: 50g, 100g, 150g, 200g, 250g, 350g, 400g, 500g, 700g, 750g, 900g, 1kg
(collections: Crunchy Peanuts Collection 300g, Peanut Butter Collection 500g).

## Supplied information used verbatim

- Peanut Butter: ingredient *Groundnut*; registration AF-0458-8809; **FDA/Vg 24-103**; directions: snacking, cooking, spread for toast, baking recipes, smoothies.
- Crunchy Peanuts: ingredient *Groundnut*; registration AF-0458-8809; **FDA/Vg 24-102**; directions: snacking, cooking, baking recipes, smoothies.
- Both: manufactured by Fauzey's Special Groundnut, Atimatim - Chairman, Ghana; brand handle *Fauzey Special Groundnut*; storage *Store in a cool, dry place*; bulk purchase +233555973723; email fauzeyspecialgroundnut@gmail.com.
- Manufacturing date, expiry date and batch number are shown as **"Variable, printed on each pack"**. `ProductLabel` accepts real values via its `batch` prop when they exist.

Registration and FDA references appear **only** on the product they belong to. The other products show "printed on the pack".

## Not supplied, therefore not shown

Prices; ingredients, nutrition, registration or FDA references for Chilli Lime Peanut Mix, Roasted Salted Peanuts, Premium Peanut Flour,
Gourmet Peanut Brittle and the two collections; the contents of the collection packs; any production/process story; company history; reviews.

## Assumptions for the Fauzey team to confirm

1. **Peanut Butter is tagged "smooth"** in the Atelier (the brief lists smoothness as a choice). Change `atelier.textures` in `products.ts` if incorrect.
2. For products without supplied directions, Atelier "uses" come from the type of product (e.g. flour for cooking/baking). The Atelier labels this as *suggested by product type*.
3. Look-alike photo filenames (`PB_50g_`, `RSP_50g-`, `RSP_50g_`, `PBs_150g`, `FPB_500g_`) are treated as **alternate photographs** of the same size. Their real meaning was not stated.
4. The WhatsApp link uses the bulk-purchase number.
5. "Essentials" replaces a "Bestsellers" section on the home page, because no sales data exists to support that claim.
