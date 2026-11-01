'use client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState, type FormEvent } from 'react';
import { track } from '@/lib/analytics';
import { searchProducts } from '@/lib/commerce/search';
import { PRODUCTS } from '@/lib/data/catalogue';
import { Drawer } from '@/components/ui/Drawer';

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} side="top" label="Search">
      <SearchBody onClose={onClose} />
    </Drawer>
  );
}

function SearchBody({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const results = useMemo(() => (q.trim() ? searchProducts(PRODUCTS, q).slice(0, 6) : []), [q]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    track('search', { q });
    onClose();
    router.push(`/shop/?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <div className="page-x w-full py-10 sm:py-14">
      <form onSubmit={submit} role="search" className="mx-auto max-w-3xl pr-10">
        <label htmlFor="site-search" className="mb-3 block font-serif text-3xl text-espresso">Search Fauzey</label>
        <div className="relative">
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input id="site-search" data-autofocus type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Peanut butter, chilli, 500g…" className="field !min-h-[3.5rem] !pl-12 text-lg" autoComplete="off" />
        </div>
      </form>
      <div className="mx-auto mt-6 max-w-3xl" aria-live="polite">
        {q.trim() && results.length === 0 && <p className="text-muted">No products match “{q}”. Try a product name or a size like 500g.</p>}
        {results.length > 0 && (
          <ul className="divide-y divide-rule border-y border-rule">
            {results.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}/`} onClick={onClose} className="flex items-baseline justify-between gap-4 py-3 hover:bg-butter/40">
                  <span className="font-serif text-xl text-espresso">{p.name}</span>
                  <span className="text-sm text-muted">{p.variants.length} {p.variants.length === 1 ? 'size' : 'sizes'}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {q.trim() && results.length > 0 && <button type="button" onClick={submit} className="mt-4 text-sm font-semibold underline underline-offset-4">See all results in the shop</button>}
      </div>
    </div>
  );
}
