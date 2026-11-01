# Product photography

## Status

The supplied catalogue contact sheet (`image(9).png`) was **not present in the build workspace**, and no individual product photographs were
found. The site therefore shows a designed "Photograph coming soon" placeholder for each product and never substitutes stock photography.
Everything is wired so real photographs appear as soon as the files exist.

## Prefixes

`CLPM` Chilli Lime Peanut Mix · `CP` Crunchy Peanuts · `FCP` Crunchy Peanuts collection · `FPB` Peanut Butter collection ·
`GPB` Gourmet Peanut Brittle · `PB` Peanut Butter · `PPF` Premium Peanut Flour · `RSP` Roasted Salted Peanuts.

The complete filename list is in `lib/data/image-manifest.ts`. Filenames are kept exactly (including `PB_50g_`, `RSP_50g-`, `PBs_150g`).

## Putting photographs in place

Files can have any common extension (`.png`, `.jpg`, `.webp`, `.avif`) and can sit in any sub-folder of `public/images/products/`.
The filename (without extension) must equal the manifest stem, e.g. `PB_500g.jpg`.

```bash
npm run images:report -- "C:\path\to\original\photos"     # REPORT ONLY. Shows: original location, filename, proposed destination, product, size
# …review the table, then, only when you decide:
npm run images:report -- "C:\path\to\original\photos" --apply
npm run scan:images                                        # runs automatically before dev/build
```

The report script moves nothing without `--apply`, never renames, and never touches unmatched files.

## Responsive variants

Static hosting cannot resize images at request time. For best mobile performance run (optional):

```bash
npm i -D sharp
npm run images:variants      # creates <stem>-480w.webp, -960w.webp, -1440w.webp beside the originals; originals untouched
npm run scan:images
```

Variants are picked up automatically as `srcset`. Recommended source size: 1600px on the long edge, JPEG/WebP.

## Alt text

Alt text is product name plus size (e.g. "Fauzey's Peanut Butter, 500g"), because the photographs have not been seen.
Refine per image if you add richer descriptions.
