'use client';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Price } from '@/components/commerce/Price';
import { ProductImage } from '@/components/commerce/ProductImage';
import { QuantityStepper } from '@/components/commerce/QuantityStepper';
import { useBag } from '@/components/providers/BagProvider';
import { PRICE_PENDING_LABEL, formatMoney } from '@/lib/commerce/format';
import { primaryStem } from '@/lib/data/catalogue';

export function BagLines({ onNavigate }: { onNavigate?: () => void }) {
  const { summary, setQuantity, remove, changeVariant } = useBag();
  return (
    <ul className="divide-y divide-rule">
      {summary.lines.map((l) => (
        <li key={l.variantId} className="grid grid-cols-[5rem_1fr] gap-4 py-5">
          <Link href={`/products/${l.product.slug}/`} onClick={onNavigate} tabIndex={-1} aria-hidden="true">
            <ProductImage stem={primaryStem(l.variant)} alt="" name={l.product.name} ratio="1 / 1" zoom={false} className="border border-rule" />
          </Link>
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <Link href={`/products/${l.product.slug}/`} onClick={onNavigate} className="font-serif text-xl leading-tight text-espresso hover:underline">{l.product.name}</Link>
              <button type="button" onClick={() => remove(l.variantId)} aria-label={`Remove ${l.product.name}, ${l.variant.sizeLabel}`} className="-mr-2 -mt-1 grid h-10 w-10 shrink-0 place-items-center text-muted hover:text-espresso">
                <Trash2 aria-hidden className="h-4 w-4" />
              </button>
            </div>
            {l.product.variants.length > 1 ? (
              <select aria-label={`Size for ${l.product.name}`} value={l.variantId} onChange={(e) => changeVariant(l.variantId, e.target.value)} className="field mt-2 !min-h-[2.5rem] !w-auto !px-3 !py-1.5 text-sm">
                {l.product.variants.map((v) => <option key={v.id} value={v.id}>{v.sizeLabel}</option>)}
              </select>
            ) : <p className="mt-1 text-sm text-muted">{l.variant.sizeLabel}</p>}
            <div className="mt-3 flex items-center justify-between gap-3">
              <QuantityStepper compact min={1} value={l.quantity} onChange={(n) => setQuantity(l.variantId, n)} label={`Quantity of ${l.product.name}, ${l.variant.sizeLabel}`} />
              <Price amount={l.lineTotal} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function SubtotalRow() {
  const { summary } = useBag();
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm font-semibold text-espresso">Subtotal</span>
      {summary.fullyPriced ? <span className="font-serif text-2xl text-espresso">{formatMoney(summary.subtotal)}</span> : <span className="text-sm italic text-muted">{PRICE_PENDING_LABEL}</span>}
    </div>
  );
}
