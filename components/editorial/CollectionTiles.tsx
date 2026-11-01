import Link from 'next/link';
import { ProductImage } from '@/components/commerce/ProductImage';
import { CATEGORIES } from '@/lib/data/categories';
import { PRODUCTS, primaryStem } from '@/lib/data/catalogue';

/** Asymmetric collection grid: the first tile leads, the rest follow. */
export function CollectionTiles() {
  const spans = ['lg:col-span-7 lg:row-span-2', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'];
  const ratios = ['4 / 4.6', '5 / 3.2', '5 / 3.2', '1 / 1', '1 / 1', '1 / 1'];
  return (
    <ul className="grid gap-5 lg:grid-cols-12">
      {CATEGORIES.slice(0, 6).map((c, i) => {
        const p = PRODUCTS.find((x) => x.category === c.id);
        const v = p?.variants.find((x) => x.id === p.defaultVariantId) ?? p?.variants[0];
        return (
          <li key={c.id} className={spans[i]}>
            <Link href={`/shop/${c.slug}/`} className="group flex h-full flex-col border border-rule bg-snow">
              <ProductImage stem={v ? primaryStem(v) : undefined} alt={`${c.name}`} name={c.name} ratio={ratios[i]} className="flex-1 !bg-snow" sizes="(min-width:1024px) 50vw, 100vw" />
              <div className="flex items-end justify-between gap-4 border-t border-rule p-5">
                <div>
                  <h3 className="font-serif text-3xl leading-none">{c.name}</h3>
                  <p className="mt-2 max-w-xs text-sm text-muted">{c.summary}</p>
                </div>
                <span className="link-underline shrink-0 text-sm font-semibold text-espresso">Explore</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
