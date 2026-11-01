'use client';
import type { ProductVariant } from '@/lib/domain/types';

export function VariantSelector({ name, variants, value, onChange }: { name: string; variants: ProductVariant[]; value: string; onChange: (id: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-espresso">Size</legend>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <label key={v.id} className="cursor-pointer">
            <input type="radio" name={`size-${name}`} value={v.id} checked={v.id === value} onChange={() => onChange(v.id)} className="peer sr-only" />
            <span className="grid min-h-[2.75rem] min-w-[3.6rem] place-items-center border border-rule bg-snow px-3 text-sm transition-colors hover:border-espresso peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-snow peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-espresso">
              {v.sizeLabel}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
