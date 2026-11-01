'use client';
import { Price } from '@/components/commerce/Price';
import { ProductImage } from '@/components/commerce/ProductImage';
import { useBag } from '@/components/providers/BagProvider';
import { PRICE_PENDING_LABEL, formatMoney } from '@/lib/commerce/format';
import { primaryStem } from '@/lib/data/catalogue';

export function OrderSummary() {
  const { summary } = useBag();
  return (
    <section aria-labelledby="summary-title" className="border border-rule bg-snow p-6">
      <h2 id="summary-title" className="text-3xl">Order summary</h2>
      <ul className="mt-5 divide-y divide-rule">
        {summary.lines.map((l) => (
          <li key={l.variantId} className="flex gap-3 py-3">
            <ProductImage stem={primaryStem(l.variant)} alt="" name={l.product.name} ratio="1 / 1" zoom={false} className="w-14 shrink-0 border border-rule" sizes="56px" />
            <div className="min-w-0 flex-1 text-sm"><p className="font-semibold text-espresso">{l.product.name}</p><p className="text-muted">{l.variant.sizeLabel}, quantity {l.quantity}</p></div>
            <Price amount={l.lineTotal} className="text-sm" />
          </li>
        ))}
      </ul>
      <dl className="mt-4 space-y-2 border-t border-rule pt-4 text-sm">
        <div className="flex justify-between gap-4"><dt>Subtotal</dt><dd>{summary.fullyPriced ? formatMoney(summary.subtotal) : <span className="italic text-muted">{PRICE_PENDING_LABEL}</span>}</dd></div>
        <div className="flex justify-between gap-4"><dt>Delivery fee</dt><dd className="italic text-muted">To be confirmed</dd></div>
        <div className="flex justify-between gap-4 border-t border-rule pt-3 font-semibold text-espresso"><dt>Total</dt><dd className="text-right">{summary.fullyPriced ? 'Delivery added at confirmation' : 'Confirmed with you'}</dd></div>
      </dl>
    </section>
  );
}
