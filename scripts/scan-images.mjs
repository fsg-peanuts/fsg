#!/usr/bin/env node
/**
 * Scans public/images/products (recursively) and writes lib/data/image-availability.json.
 * Read-only with respect to photographs: it never moves, renames, edits or deletes images.
 * Variant files named "<stem>-480w.webp" etc. are attached to their parent image as srcset entries.
 */
import { readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, extname, basename, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'public', 'images', 'products');
const out = join(root, 'lib', 'data', 'image-availability.json');
const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);

function walk(d) {
  let files = [];
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) files = files.concat(walk(p));
    else if (EXT.has(extname(name).toLowerCase())) files.push(p);
  }
  return files;
}

const files = walk(dir).sort();
const images = {};
const variants = [];

for (const f of files) {
  const rel = relative(dir, f).split(sep).join('/');
  const stem = basename(f, extname(f));
  const m = /^(.*)-(\d{3,4})w$/.exec(stem);
  if (m) variants.push({ parent: m[1], width: m[2], rel });
  else images[stem] = { src: rel };
}
for (const v of variants) {
  if (images[v.parent]) (images[v.parent].variants ??= {})[v.width] = v.rel;
}

const sorted = Object.fromEntries(Object.entries(images).sort(([a], [b]) => a.localeCompare(b)));
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify({ images: sorted }, null, 2) + '\n');
console.log(`scan-images: ${Object.keys(sorted).length} product photograph(s) found in public/images/products`);
