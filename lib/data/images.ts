import availability from '@/lib/data/image-availability.json';
import { assetPath } from '@/lib/utils/assets';

/**
 * Resolves manifest stems to real files found by `npm run scan:images` (runs before dev/build).
 * Missing photographs resolve to `null`; the UI then renders a designed placeholder instead of
 * a broken image or unrelated stock photography.
 */
interface Entry {
  src: string;
  variants?: Record<string, string>;
}

const images = (availability as { images: Record<string, Entry> }).images;
const lower = new Map(Object.entries(images).map(([k, v]) => [k.toLowerCase(), v]));

export interface ResolvedImage {
  stem: string;
  src: string;
  srcSet?: string;
}

export function resolveImage(stem: string | undefined): ResolvedImage | null {
  if (!stem) return null;
  const entry = images[stem] ?? lower.get(stem.toLowerCase());
  if (!entry) return null;
  const base = '/images/products/';
  const srcSet = entry.variants
    ? Object.entries(entry.variants)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([w, file]) => `${assetPath(base + file)} ${w}w`)
        .concat(`${assetPath(base + entry.src)} 1600w`)
        .join(', ')
    : undefined;
  return { stem, src: assetPath(base + entry.src), srcSet };
}

export const availableImageCount = () => Object.keys(images).length;
