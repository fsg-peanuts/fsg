#!/usr/bin/env node
/**
 * OPTIONAL: creates responsive WebP variants next to your photographs (originals are never modified).
 *   npm i -D sharp && npm run images:variants
 * Output: <stem>-480w.webp, <stem>-960w.webp, <stem>-1440w.webp. `npm run scan:images` then wires
 * them into srcset automatically. Existing variants are skipped.
 */
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

let sharp;
try { sharp = (await import('sharp')).default; } catch {
  console.error('sharp is not installed. Run: npm i -D sharp'); process.exit(1);
}
const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images', 'products');
const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);
const WIDTHS = [480, 960, 1440];
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });

let made = 0;
for (const f of walk(dir)) {
  const ext = extname(f).toLowerCase();
  const stem = basename(f, extname(f));
  if (!EXT.has(ext) || /-\d{3,4}w$/.test(stem)) continue;
  const meta = await sharp(f).metadata();
  for (const w of WIDTHS) {
    const out = join(dirname(f), `${stem}-${w}w.webp`);
    if (existsSync(out) || (meta.width && meta.width < w)) continue;
    await sharp(f).resize({ width: w }).webp({ quality: 82 }).toFile(out);
    made++;
  }
}
console.log(`make-variants: created ${made} variant file(s). Now run: npm run scan:images`);
