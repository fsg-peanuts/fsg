#!/usr/bin/env node
/**
 * Serves ./out exactly like GitHub Pages serves a project site: under /fauzey-peanut/,
 * directory URLs -> index.html, unknown paths -> 404.html with a 404 status.
 * Usage: npm run build && npm run preview   (PORT and BASE_PATH are overridable)
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'out');
const base = (process.env.BASE_PATH ?? '/fauzey-peanut').replace(/\/$/, '');
const port = Number(process.env.PORT ?? 4173);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon', '.txt': 'text/plain',
  '.xml': 'application/xml', '.map': 'application/json',
};

function resolve(urlPath) {
  if (!urlPath.startsWith(base + '/') && urlPath !== base) return null;
  let rel = decodeURIComponent(urlPath.slice(base.length)) || '/';
  const full = normalize(join(root, rel));
  if (!full.startsWith(root)) return null;
  if (existsSync(full) && statSync(full).isDirectory()) {
    if (!rel.endsWith('/')) return { redirect: base + rel + '/' };
    const idx = join(full, 'index.html');
    return existsSync(idx) ? { file: idx } : null;
  }
  return existsSync(full) ? { file: full } : null;
}

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://x');
  const hit = resolve(url.pathname);
  if (hit?.redirect) { res.writeHead(301, { Location: hit.redirect }); return res.end(); }
  if (hit?.file) {
    res.writeHead(200, { 'Content-Type': TYPES[extname(hit.file)] ?? 'application/octet-stream' });
    return res.end(readFileSync(hit.file));
  }
  const nf = join(root, '404.html');
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(existsSync(nf) ? readFileSync(nf) : 'Not found');
}).listen(port, () => console.log(`Preview: http://localhost:${port}${base}/`));
