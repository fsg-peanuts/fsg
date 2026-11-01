import { SITE } from '@/lib/config/site';
import type { LabelInfo } from '@/lib/domain/types';

export interface BatchInfo { manufacturingDate?: string; expiryDate?: string; batchNumber?: string }

/**
 * Reusable product-label information. Every field is dynamic and optional. Nothing is fabricated:
 * dates and batch numbers are "Variable" (printed on each pack) unless real values are passed in.
 */
export function ProductLabel({ label, netWeight, batch, productName }: { label: LabelInfo; netWeight: string; batch?: BatchInfo; productName: string }) {
  const hasDetails = Boolean(label.ingredients || label.manufacturer || label.fdaReference || label.storage);
  const rows: [string, string | undefined][] = [
    ['Net weight', netWeight],
    ['Ingredients', label.ingredients ?? (hasDetails ? undefined : 'Listed on the pack')],
    ['Manufacturing date', hasDetails ? (batch?.manufacturingDate ?? 'Variable, printed on each pack') : undefined],
    ['Expiry date', hasDetails ? (batch?.expiryDate ?? 'Variable, printed on each pack') : undefined],
    ['Batch number', hasDetails ? (batch?.batchNumber ?? 'Variable, printed on each pack') : undefined],
    ['Manufactured by', label.manufacturer],
    ['Location', label.location],
    ['Registration / reference', label.registration],
    ['FDA reference', label.fdaReference],
    ['Storage', label.storage],
    ['Brand handle', label.brandHandle],
    ['Email', label.email],
    ['Bulk purchase', label.bulkPhone],
  ];
  return (
    <section aria-labelledby="label-heading" className="border border-rule bg-snow p-6 sm:p-8">
      <h2 id="label-heading" className="text-3xl">Product information</h2>
      <p className="mt-1 text-sm text-muted">{productName}, {netWeight}</p>
      <dl className="mt-6 divide-y divide-rule">
        {rows.filter(([, v]) => v).map(([k, v]) => (
          <div key={k} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
            <dt className="text-sm font-semibold text-espresso">{k}</dt>
            <dd className="text-[0.97rem]">
              {k === 'Email' ? <a className="underline underline-offset-4" href={`mailto:${v}`}>{v}</a>
                : k === 'Bulk purchase' ? <a className="underline underline-offset-4" href={`tel:${SITE.bulkPhone}`}>{v}</a>
                : v}
            </dd>
          </div>
        ))}
      </dl>
      {label.directions && (
        <div className="mt-6 border-t border-rule pt-6">
          <h3 className="mb-3 text-2xl">Directions for use</h3>
          <ul className="flex flex-wrap gap-2">
            {label.directions.map((d) => <li key={d} className="border border-rule bg-cream px-3 py-1.5 text-sm">{d}</li>)}
          </ul>
        </div>
      )}
      {!hasDetails && <p className="mt-6 text-sm text-muted">Full ingredients, dates, batch number and regulatory details are printed on the pack.</p>}
    </section>
  );
}
