'use client';
import { useEffect, useMemo, useState } from 'react';
import { AddToBagButton } from '@/components/commerce/AddToBagButton';
import { Price } from '@/components/commerce/Price';
import { ProductImage } from '@/components/commerce/ProductImage';
import { ProductLabel } from '@/components/commerce/ProductLabel';
import { QuantityStepper } from '@/components/commerce/QuantityStepper';
import { VariantSelector } from '@/components/commerce/VariantSelector';
import { track } from '@/lib/analytics';
import { getCategory } from '@/lib/data/categories';
import { resolveImage } from '@/lib/data/images';
import type { Product } from '@/lib/domain/types';

export function ProductView({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.defaultVariantId);
  const [quantity, setQuantity] = useState(1);
  const [active, setActive] = useState(0);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const category = getCategory(product.category);

  useEffect(() => { track('product_view', { slug: product.slug }); }, [product.slug]);

  const gallery = useMemo(() => {
    const real = variant.images.filter((i) => resolveImage(i.stem));
    return real.length ? real : variant.images.slice(0, 1);
  }, [variant]);
  const current = gallery[Math.min(active, gallery.length - 1)];

  function pickVariant(id: string) { setVariantId(id); setActive(0); }

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ProductImage stem={current?.stem} alt={`${product.name}, ${variant.sizeLabel}`} name={product.name} sizeLabel={variant.sizeLabel} ratio="1 / 1" sizes="(min-width:1024px) 58vw, 100vw" priority zoom={false} className="border border-rule" />
          {gallery.length > 1 && (
            <ul className="mt-3 flex gap-3" aria-label="Product photographs">
              {gallery.map((g, i) => (
                <li key={g.stem} className="w-20">
                  <button type="button" onClick={() => setActive(i)} aria-label={`Show photograph ${i + 1} of ${gallery.length}`} aria-current={i === active} className={`block w-full border ${i === active ? 'border-espresso' : 'border-rule'}`}>
                    <ProductImage stem={g.stem} alt="" name={product.name} ratio="1 / 1" zoom={false} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-5 lg:pt-6">
          <p className="label text-chestnut">{category?.name}</p>
          <h1 className="display-md mt-3">{product.name}</h1>
          <p className="lede mt-4 italic text-chestnut">{product.tagline}</p>
          <p className="mt-6 max-w-[32rem] text-[1.02rem]">{product.description}</p>

          <div className="mt-8 border-t border-rule pt-6">
            <p className="mb-5 text-2xl"><Price amount={variant.price} className="text-2xl" /></p>
            {product.variants.length > 1 ? (
              <VariantSelector name={product.slug} variants={product.variants} value={variantId} onChange={pickVariant} />
            ) : (
              <p className="text-sm"><span className="font-semibold text-espresso">Size:</span> {variant.sizeLabel}</p>
            )}
            <div className="mt-6 flex items-end gap-3">
              <div>
                <p className="mb-2 text-sm font-semibold text-espresso">Quantity</p>
                <QuantityStepper value={quantity} onChange={setQuantity} label={`Quantity of ${product.name}`} />
              </div>
              <div className="hidden flex-1 md:block">
                <AddToBagButton variantId={variant.id} quantity={quantity} productName={product.name} sizeLabel={variant.sizeLabel} />
              </div>
            </div>
            <p className="mt-4 text-xs text-muted">SKU {variant.sku}</p>
          </div>

          <ul className="mt-8 space-y-2 border-t border-rule pt-6 text-[0.97rem]">
            {product.highlights.map((h) => <li key={h} className="flex gap-3"><span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-amber" />{h}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-16 lg:mt-24"><ProductLabel label={product.label} netWeight={variant.sizeLabel} productName={product.name} /></div>

      {/* Sticky mobile purchase action */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-cream/95 px-4 py-3 backdrop-blur md:hidden" data-testid="sticky-buy">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-espresso">{product.name}</p>
            <p className="text-xs text-muted">{variant.sizeLabel} · {variant.price === null ? 'Price awaiting configuration' : <Price amount={variant.price} className="text-xs" />}</p>
          </div>
          <div className="w-40"><AddToBagButton variantId={variant.id} quantity={quantity} productName={product.name} sizeLabel={variant.sizeLabel} /></div>
        </div>
      </div>
    </>
  );
}
