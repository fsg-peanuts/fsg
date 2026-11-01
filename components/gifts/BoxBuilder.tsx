'use client';
import { Plus, X } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ProductImage } from '@/components/commerce/ProductImage';
import { useBag } from '@/components/providers/BagProvider';
import { buttonClass } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { track } from '@/lib/analytics';
import { PRODUCTS, getVariantWithProduct, primaryStem } from '@/lib/data/catalogue';

const BOX_SIZES = [3, 5, 8] as const;
const CHOICES = PRODUCTS.filter((p) => p.category !== 'gifts');

export function BoxBuilder() {
  const [size, setSize] = useState<(typeof BOX_SIZES)[number]>(3);
  const [slots, setSlots] = useState<string[]>([]);
  const [pick, setPick] = useState<Record<string, string>>({});
  const { add } = useBag();
  const { toast } = useToast();

  const full = slots.length >= size;
  const grouped = useMemo(() => {
    const m = new Map<string, number>();
    slots.forEach((id) => m.set(id, (m.get(id) ?? 0) + 1));
    return [...m.entries()];
  }, [slots]);

  function addToBox(variantId: string) {
    if (full) return;
    if (slots.length === 0) track('gift_builder_started');
    setSlots((s) => [...s, variantId]);
  }

  function addBoxToBag() {
    grouped.forEach(([id, qty]) => add(id, qty));
    track('gift_box_completed', { size });
    toast(`Your ${size}-item Fauzey Box was added to your bag.`, { label: 'View bag', href: '/bag/' });
    setSlots([]);
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <fieldset className="mb-10">
          <legend className="mb-3 font-serif text-3xl text-espresso">1. Choose your box</legend>
          <div className="flex gap-3">
            {BOX_SIZES.map((n) => (
              <label key={n} className={`cursor-pointer ${slots.length > n ? 'pointer-events-none opacity-40' : ''}`}>
                <input type="radio" name="box-size" className="peer sr-only" checked={size === n} disabled={slots.length > n} onChange={() => setSize(n)} />
                <span className="grid min-h-[3.5rem] min-w-[6.5rem] place-items-center border border-rule bg-snow px-5 font-serif text-2xl transition-colors peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-snow peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-espresso">{n} items</span>
              </label>
            ))}
          </div>
        </fieldset>

        <h2 className="mb-4 font-serif text-3xl">2. Fill it</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {CHOICES.map((p) => {
            const vid = pick[p.slug] ?? p.defaultVariantId;
            const v = p.variants.find((x) => x.id === vid) ?? p.variants[0];
            return (
              <li key={p.slug} className="flex gap-4 border border-rule bg-snow p-3">
                <ProductImage stem={primaryStem(v)} alt="" name={p.name} ratio="1 / 1" zoom={false} className="w-24 shrink-0 border border-rule" sizes="96px" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="font-serif text-xl leading-tight text-espresso">{p.name}</p>
                  <div className="mt-auto flex items-center gap-2 pt-3">
                    <select aria-label={`Size for ${p.name}`} value={vid} onChange={(e) => setPick((s) => ({ ...s, [p.slug]: e.target.value }))} className="field !min-h-[2.5rem] !w-auto !px-2 !py-1 text-sm">
                      {p.variants.map((x) => <option key={x.id} value={x.id}>{x.sizeLabel}</option>)}
                    </select>
                    <button type="button" disabled={full} onClick={() => addToBox(v.id)} className={buttonClass('secondary', 'md', '!min-h-[2.5rem] flex-1 !px-3 !text-[0.7rem]')} aria-label={`Add ${p.name}, ${v.sizeLabel} to box`}><Plus aria-hidden className="h-4 w-4" />Add</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start" aria-labelledby="box-title">
        <div className="border border-espresso bg-snow p-6 sm:p-8">
          <h2 id="box-title" className="text-4xl">Your Fauzey Box</h2>
          <p className="mt-1 text-sm text-muted" aria-live="polite">{slots.length} of {size} chosen{full ? '. Your box is full.' : '.'}</p>
          <ol className="mt-6 grid grid-cols-4 gap-2" aria-label="Box slots">
            {Array.from({ length: size }, (_, i) => {
              const id = slots[i];
              const hit = id ? getVariantWithProduct(id) : undefined;
              return (
                <li key={i} className={`relative aspect-square border ${hit ? 'border-espresso bg-butter' : 'border-dashed border-rule bg-cream'}`}>
                  {hit ? (
                    <>
                      <ProductImage stem={primaryStem(hit.variant)} alt={`${hit.product.name}, ${hit.variant.sizeLabel}`} name={hit.product.name} ratio="1 / 1" zoom={false} className="!bg-transparent" sizes="80px" />
                      <button type="button" onClick={() => setSlots((s) => s.filter((_, j) => j !== i))} aria-label={`Remove ${hit.product.name}, ${hit.variant.sizeLabel} from box`} className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center bg-espresso text-snow"><X aria-hidden className="h-3.5 w-3.5" /></button>
                    </>
                  ) : <span aria-hidden className="grid h-full place-items-center font-serif text-xl text-rule">{i + 1}</span>}
                </li>
              );
            })}
          </ol>
          {grouped.length > 0 && (
            <ul className="mt-6 divide-y divide-rule border-y border-rule text-sm">
              {grouped.map(([id, qty]) => { const h = getVariantWithProduct(id)!; return <li key={id} className="flex justify-between py-2"><span>{qty} × {h.product.name}</span><span className="text-muted">{h.variant.sizeLabel}</span></li>; })}
            </ul>
          )}
          <p className="mt-5 text-sm italic text-muted">Price awaiting configuration. Box pricing is confirmed by Fauzey.</p>
          <button type="button" disabled={!full} onClick={addBoxToBag} className={buttonClass('primary', 'lg', 'mt-5 w-full')}>Add box to bag</button>
          {!full && <p className="mt-3 text-center text-xs text-muted">Choose {size - slots.length} more to complete your box.</p>}
          <Link href="/bag/" className="mt-4 block text-center text-sm underline underline-offset-4">View bag</Link>
        </div>
      </aside>
    </div>
  );
}
