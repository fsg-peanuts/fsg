'use client';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/commerce/ProductCard';
import { buttonClass } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { SORT_LABELS, searchProducts, sortProducts, type SortKey } from '@/lib/commerce/search';
import { PRODUCTS, hasAnyPrices } from '@/lib/data/catalogue';
import { CATEGORIES } from '@/lib/data/categories';

export function ShopCatalogue({ categoryId }: { categoryId?: string }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [sort, setSort] = useState<SortKey>('featured');
  const priced = hasAnyPrices();
  const sortKeys = (Object.keys(SORT_LABELS) as SortKey[]).filter((k) => priced || !k.startsWith('price'));

  const results = useMemo(() => {
    const base = categoryId ? PRODUCTS.filter((p) => p.category === categoryId) : PRODUCTS;
    return sortProducts(searchProducts(base, query), sort);
  }, [categoryId, query, sort]);

  const chip = (active: boolean) => `whitespace-nowrap border px-4 py-2 text-sm transition-colors ${active ? 'border-espresso bg-espresso text-snow' : 'border-rule bg-snow hover:border-espresso'}`;

  return (
    <div>
      <nav aria-label="Shop categories" className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 sm:flex-wrap">
          <li><Link href="/shop/" aria-current={!categoryId ? 'page' : undefined} className={chip(!categoryId)}>All products</Link></li>
          {CATEGORIES.map((c) => (
            <li key={c.id}><Link href={`/shop/${c.slug}/`} aria-current={categoryId === c.id ? 'page' : undefined} className={chip(categoryId === c.id)}>{c.name}</Link></li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 grid gap-4 border-y border-rule py-5 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <label htmlFor="shop-search" className="mb-1.5 block text-sm font-semibold text-espresso">Search products</label>
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input id="shop-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “chilli”, “500g” or “flour”" className="field !pl-11 !pr-11" autoComplete="off" />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center text-muted hover:text-espresso"><X aria-hidden className="h-4 w-4" /></button>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="shop-sort" className="mb-1.5 block text-sm font-semibold text-espresso">Sort by</label>
          <select id="shop-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="field sm:min-w-[14rem]">
            {sortKeys.map((k) => <option key={k} value={k}>{SORT_LABELS[k]}</option>)}
          </select>
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-4 text-sm text-muted">
        {results.length} {results.length === 1 ? 'product' : 'products'}{query ? ` for “${query}”` : ''}
      </p>

      {results.length === 0 ? (
        <EmptyState title="Nothing matches that search" action={<button type="button" onClick={() => setQuery('')} className={buttonClass('secondary')}>Clear search</button>}>
          Check the spelling, or try a product, a size like 500g, or a flavour.
        </EmptyState>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-14 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((p, i) => <li key={p.slug}><ProductCard product={p} priority={i < 4} headingLevel={2} /></li>)}
        </ul>
      )}
    </div>
  );
}
