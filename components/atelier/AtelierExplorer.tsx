'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AddToBagButton } from '@/components/commerce/AddToBagButton';
import { Price } from '@/components/commerce/Price';
import { ProductImage } from '@/components/commerce/ProductImage';
import { buttonClass } from '@/components/ui/Button';
import { FLAVOUR_LABELS, TEXTURE_LABELS, USE_LABELS, hasPreferences, recommend, type AtelierPreferences } from '@/lib/commerce/recommend';
import { PRODUCTS, primaryStem } from '@/lib/data/catalogue';
import type { FlavourId, TextureId, UseId } from '@/lib/domain/types';

function toggle<T>(list: T[], v: T): T[] { return list.includes(v) ? list.filter((x) => x !== v) : [...list, v]; }

function Group<T extends string>({ legend, options, selected, onToggle }: { legend: string; options: Record<T, string>; selected: T[]; onToggle: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="mb-3 font-serif text-3xl text-espresso">{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {(Object.keys(options) as T[]).map((k) => (
          <label key={k} className="cursor-pointer">
            <input type="checkbox" className="peer sr-only" checked={selected.includes(k)} onChange={() => onToggle(k)} />
            <span className="inline-block min-h-[3rem] border border-rule bg-snow px-5 py-3 transition-colors hover:border-espresso peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-snow peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-espresso">{options[k]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function AtelierExplorer() {
  const [prefs, setPrefs] = useState<AtelierPreferences>({ textures: [], flavours: [], uses: [] });
  const results = useMemo(() => recommend(PRODUCTS, prefs), [prefs]);
  const active = hasPreferences(prefs);

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      <form className="space-y-10 lg:col-span-5" onSubmit={(e) => e.preventDefault()} aria-label="Your preferences">
        <Group<TextureId> legend="Texture" options={TEXTURE_LABELS} selected={prefs.textures} onToggle={(v) => setPrefs((p) => ({ ...p, textures: toggle(p.textures, v) }))} />
        <Group<FlavourId> legend="Flavour" options={FLAVOUR_LABELS} selected={prefs.flavours} onToggle={(v) => setPrefs((p) => ({ ...p, flavours: toggle(p.flavours, v) }))} />
        <Group<UseId> legend="How you will enjoy it" options={USE_LABELS} selected={prefs.uses} onToggle={(v) => setPrefs((p) => ({ ...p, uses: toggle(p.uses, v) }))} />
        {active && <button type="button" onClick={() => setPrefs({ textures: [], flavours: [], uses: [] })} className="text-sm font-semibold underline underline-offset-4">Clear my choices</button>}
      </form>

      <section aria-labelledby="atelier-results" aria-live="polite" className="lg:col-span-7">
        <h2 id="atelier-results" className="mb-6 text-4xl">{active ? (results.length ? 'Your Fauzey matches' : 'No match for that mix') : 'Your matches appear here'}</h2>
        {!active && <p className="max-w-md text-muted">Choose one or more preferences and we will show the Fauzey products that fit. The more you choose, the closer the match.</p>}
        {active && results.length === 0 && <p className="max-w-md text-muted">None of our products carry that exact combination. Remove one choice to see more.</p>}
        <ul className="space-y-6">
          {results.map(({ product, score, reasons, usesInferred }) => {
            const v = product.variants.find((x) => x.id === product.defaultVariantId) ?? product.variants[0];
            return (
              <li key={product.slug} className="grid gap-5 border border-rule bg-snow p-4 sm:grid-cols-[10rem_1fr] sm:p-5">
                <ProductImage stem={primaryStem(v)} alt={`${product.name}, ${v.sizeLabel}`} name={product.name} sizeLabel={v.sizeLabel} ratio="1 / 1" zoom={false} className="border border-rule" sizes="160px" />
                <div className="flex flex-col">
                  <h3 className="font-serif text-3xl leading-tight"><Link href={`/products/${product.slug}/`} className="link-underline">{product.name}</Link></h3>
                  <p className="mt-1 text-sm text-chestnut">Matches {score} of your {score === 1 ? 'choice' : 'choices'}: {reasons.join(', ')}</p>
                  <p className="mt-2 text-[0.97rem]">{product.description}</p>
                  {usesInferred && <p className="mt-2 text-xs text-muted">Some uses are suggested by the type of product, not by Fauzey’s printed directions.</p>}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Price amount={v.price} />
                    <span className="text-sm text-muted">{v.sizeLabel}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="w-44"><AddToBagButton compact variantId={v.id} productName={product.name} sizeLabel={v.sizeLabel} /></div>
                    <Link href={`/products/${product.slug}/`} className={buttonClass('secondary', 'md', '!min-h-[2.75rem] !px-4 !text-[0.72rem]')}>See sizes</Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
