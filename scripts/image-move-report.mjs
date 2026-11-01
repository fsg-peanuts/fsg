#!/usr/bin/env node
/**
 * REPORT-FIRST image organiser. Moves nothing unless you pass --apply.
 *
 *   node scripts/image-move-report.mjs <folder-with-original-photos>          # report only
 *   node scripts/image-move-report.mjs <folder-with-original-photos> --apply  # move (only when you decide)
 *
 * For each file whose name matches the Fauzey manifest it prints: original location, original
 * filename, proposed destination, associated product and associated size. Filenames are kept
 * exactly as they are (look-alikes such as PB_50g and PB_50g_ stay distinct). Unmatched files
 * are listed and never touched.
 */
import { readdirSync, statSync, mkdirSync, renameSync, existsSync, copyFileSync, unlinkSync } from 'node:fs';
import { join, extname, basename, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const srcArg = args.find((a) => !a.startsWith('--'));
if (!srcArg) { console.error('Usage: node scripts/image-move-report.mjs <source-folder> [--apply]'); process.exit(1); }

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
const dest = join(repo, 'public', 'images', 'products');
const PRODUCTS = {
  PB: ['Fauzey\'s Peanut Butter', 'peanut-butter'], PBs: ['Fauzey\'s Peanut Butter', 'peanut-butter'],
  CP: ['Fauzey\'s Crunchy Peanuts', 'crunchy-peanuts'], CLPM: ['Chilli Lime Peanut Mix', 'chilli-lime-peanut-mix'],
  RSP: ['Roasted Salted Peanuts', 'roasted-salted-peanuts'], PPF: ['Premium Peanut Flour', 'premium-peanut-flour'],
  GPB: ['Gourmet Peanut Brittle', 'gourmet-peanut-brittle'], FCP: ['Crunchy Peanuts Collection', 'crunchy-peanuts-collection'],
  FPB: ['Peanut Butter Collection', 'peanut-butter-collection'],
};
const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.tif', '.tiff']);
const RE = /^([A-Za-z]+)_(\d+(?:\.\d+)?)(kg|g)(.*)$/;

function walk(d) {
  return readdirSync(d).flatMap((n) => {
    const p = join(d, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const source = resolve(srcArg);
const rows = [], unmatched = [];
for (const file of walk(source)) {
  if (!EXT.has(extname(file).toLowerCase())) continue;
  const name = basename(file);
  const m = RE.exec(basename(file, extname(file)));
  const prod = m && PRODUCTS[m[1]];
  if (!prod) { unmatched.push(file); continue; }
  rows.push({
    from: file, filename: name, to: join(dest, prod[1], name), product: prod[0],
    size: `${m[2]}${m[3]}`, note: m[1] === 'PBs' || m[4] ? 'look-alike variant (kept distinct)' : '',
  });
}

console.table(rows.map((r) => ({ 'Original location': r.from, Filename: r.filename, 'Proposed destination': r.to, Product: r.product, Size: r.size, Note: r.note })));
if (unmatched.length) { console.log(`\nUnmatched (will NOT be touched): ${unmatched.length}`); unmatched.forEach((u) => console.log('  ' + u)); }
const clashes = rows.filter((r) => existsSync(r.to));
if (clashes.length) console.log(`\nWARNING: ${clashes.length} destination file(s) already exist and will be skipped.`);

if (!apply) { console.log(`\nREPORT ONLY. ${rows.length} file(s) matched. Re-run with --apply to move them.`); process.exit(0); }
for (const r of rows) {
  if (existsSync(r.to)) continue;
  mkdirSync(dirname(r.to), { recursive: true });
  try { renameSync(r.from, r.to); } catch { copyFileSync(r.from, r.to); unlinkSync(r.from); } // cross-device fallback
}
console.log(`\nMoved ${rows.filter((r) => !clashes.includes(r)).length} file(s). Now run: npm run scan:images`);
