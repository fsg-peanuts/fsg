/**
 * GitHub Pages deployment (project site):
 *   https://fsg-peanuts.github.io/fsg/
 *
 * - `output: 'export'` writes a fully static site to `out/`.
 * - Production builds use the `/fauzey-peanut` base path. Local `next dev` uses none.
 * - Override with NEXT_PUBLIC_BASE_PATH (use "" for a custom domain at the root).
 */
const isProd = process.env.NODE_ENV === 'production';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? '/fsg' : '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
