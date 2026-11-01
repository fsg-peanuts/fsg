import type { Metadata } from 'next';
import { SITE } from '@/lib/config/site';
import { absoluteUrl } from '@/lib/utils/assets';

/** Per-page metadata with an explicit absolute canonical URL (safe under the /fauzey-peanut subpath). */
export function pageMetadata({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = absoluteUrl(path);
  const img = image ?? absoluteUrl('/og.png');
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | ${SITE.name}`, description, url, siteName: SITE.name, locale: 'en_GH', type: 'website', images: [{ url: img, width: 1200, height: 630, alt: `${SITE.name}: ${SITE.statement}` }] },
    twitter: { card: 'summary_large_image', title: `${title} | ${SITE.name}`, description, images: [img] },
  };
}
