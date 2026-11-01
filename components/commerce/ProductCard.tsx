'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AddToBagButton } from '@/components/commerce/AddToBagButton';
import { Price } from '@/components/commerce/Price';
import { ProductImage } from '@/components/commerce/ProductImage';
import { primaryStem } from '@/lib/data/catalogue';
import type { Product } from '@/lib/domain/types';

export function ProductCard({ product, ratio = '4 / 5', priority = false, headingLevel = 3 }: { product: Product; ratio?: string; priority?: boolean; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const [variantId, setVariantId] = useState(product.defaultVariantId);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const href = `/products/${product.slug}/`;
  return (
    <article className="group flex flex-col">
      <Link href={href} className="block" tabIndex={-1} aria-hidden="true">
        <ProductImage stem={primaryStem(variant)} alt={`${product.name}, ${variant.sizeLabel}`} name={product.name} sizeLabel={variant.sizeLabel} ratio={ratio} priority={priority} className="border border-rule" />
      </Link>
      <div className="mt-4 flex-1">
        <Heading className="font-serif text-[1.55rem] leading-tight"><Link href={href} className="link-underline">{product.name}</Link></Heading>
        <p className="mt-1 text-sm text-muted">{product.tagline}</p>
        <p className="mt-2"><Price amount={variant.price} /></p>
      </div>
      <div className="mt-4 flex items-stretch gap-2">
        {product.variants.length > 1 ? (
          <select aria-label={`Size for ${product.name}`} value={variantId} onChange={(e) => setVariantId(e.target.value)} className="field !min-h-[2.75rem] !w-auto min-w-[5.5rem] !px-3 !py-2 text-sm">
            {product.variants.map((v) => <option key={v.id} value={v.id}>{v.sizeLabel}</option>)}
          </select>
        ) : (
          <span className="grid min-h-[2.75rem] place-items-center border border-rule bg-snow px-3 text-sm">{variant.sizeLabel}</span>
        )}
        <AddToBagButton compact variantId={variant.id} productName={product.name} sizeLabel={variant.sizeLabel} className="flex-1" />
      </div>
    </article>
  );
}
