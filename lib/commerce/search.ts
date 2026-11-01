import { getCategory } from '@/lib/data/categories';
import type { Product } from '@/lib/domain/types';

export type SortKey = 'featured' | 'name-asc' | 'name-desc' | 'size-asc' | 'size-desc' | 'price-asc' | 'price-desc';

export const SORT_LABELS: Record<SortKey, string> = {
  featured: 'Featured',
  'name-asc': 'Name, A to Z',
  'name-desc': 'Name, Z to A',
  'size-asc': 'Smallest size first',
  'size-desc': 'Largest size first',
  'price-asc': 'Price, low to high',
  'price-desc': 'Price, high to low',
};

const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

function haystack(p: Product): string {
  const cat = getCategory(p.category);
  return normalise(
    [p.name, p.tagline, p.description, p.code, cat?.name ?? '', ...p.variants.map((v) => v.sizeLabel), ...p.highlights, p.label.ingredients ?? ''].join(' '),
  );
}

/** Every whitespace-separated term must appear (AND). Empty query returns everything. */
export function searchProducts(products: Product[], query: string): Product[] {
  const terms = normalise(query).split(' ').filter(Boolean);
  if (terms.length === 0) return products;
  return products.filter((p) => {
    const h = haystack(p);
    return terms.every((t) => h.includes(t));
  });
}

export function sortProducts(products: Product[], key: SortKey): Product[] {
  const list = [...products];
  const minPrice = (p: Product) => {
    const prices = p.variants.map((v) => v.price).filter((x): x is number => x !== null);
    return prices.length ? Math.min(...prices) : Number.POSITIVE_INFINITY;
  };
  const minSize = (p: Product) => Math.min(...p.variants.map((v) => v.grams));
  const maxSize = (p: Product) => Math.max(...p.variants.map((v) => v.grams));
  switch (key) {
    case 'name-asc':
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return list.sort((a, b) => b.name.localeCompare(a.name));
    case 'size-asc':
      return list.sort((a, b) => minSize(a) - minSize(b));
    case 'size-desc':
      return list.sort((a, b) => maxSize(b) - maxSize(a));
    case 'price-asc':
      return list.sort((a, b) => minPrice(a) - minPrice(b));
    case 'price-desc':
      return list.sort((a, b) => (Number.isFinite(minPrice(b)) ? minPrice(b) : -1) - (Number.isFinite(minPrice(a)) ? minPrice(a) : -1));
    default:
      return list;
  }
}
