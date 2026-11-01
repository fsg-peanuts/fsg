import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/utils/assets';

export const dynamic = 'force-static';

/**
 * NOTE: crawlers only honour /robots.txt at a domain root. On a GitHub Pages project site
 * (…github.io/fauzey-peanut/) this file is informational; it becomes effective on a custom domain.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/checkout/', '/order/'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
