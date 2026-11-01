import type { MetadataRoute } from 'next';
import { CATEGORIES } from '@/lib/data/categories';
import { PRODUCTS } from '@/lib/data/catalogue';
import { ARTICLES } from '@/lib/data/journal';
import { absoluteUrl } from '@/lib/utils/assets';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ['/', '/shop/', '/atelier/', '/story/', '/gifts/', '/gifts/build-your-box/', '/gifts/corporate/', '/journal/', '/contact/', '/bag/'];
  const paths = [
    ...fixed,
    ...CATEGORIES.map((c) => `/shop/${c.slug}/`),
    ...PRODUCTS.map((p) => `/products/${p.slug}/`),
    ...ARTICLES.map((a) => `/journal/${a.slug}/`),
  ];
  return paths.map((p) => ({ url: absoluteUrl(p), changeFrequency: p === '/' ? 'weekly' : 'monthly', priority: p === '/' ? 1 : p.startsWith('/products/') || p === '/shop/' ? 0.8 : 0.6 }));
}
