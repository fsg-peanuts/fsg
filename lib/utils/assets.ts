/** Base-path aware helpers. Required for GitHub Pages project sites (/fauzey-peanut). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefix a public/ asset path with the base path, e.g. "/images/x.png" -> "/fauzey-peanut/images/x.png". */
export function assetPath(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}

/** Full public site URL including the base path, no trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://GITHUB_USERNAME.github.io/fauzey-peanut'
).replace(/\/+$/, '');

/** Absolute URL for a site path (path excludes the base path), e.g. "/shop/". */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
