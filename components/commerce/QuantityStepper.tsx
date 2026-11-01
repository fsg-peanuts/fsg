'use client';
import { Minus, Plus } from 'lucide-react';
import { MAX_LINE_QUANTITY } from '@/lib/config/commerce';

export function QuantityStepper({ value, onChange, min = 1, label, compact = false }: { value: number; onChange: (n: number) => void; min?: number; label: string; compact?: boolean }) {
  const size = compact ? 'h-10 w-10' : 'h-12 w-12';
  const btn = `${size} grid place-items-center text-espresso transition-colors hover:bg-butter/70 disabled:opacity-40`;
  return (
    <div role="group" aria-label={label} className="inline-flex items-center border border-rule bg-snow">
      <button type="button" className={btn} aria-label="Decrease quantity" disabled={value <= min} onClick={() => onChange(value - 1)}><Minus aria-hidden className="h-4 w-4" /></button>
      <output aria-live="polite" className={`${compact ? 'w-8' : 'w-10'} text-center font-semibold tabular-nums text-espresso`}>{value}</output>
      <button type="button" className={btn} aria-label="Increase quantity" disabled={value >= MAX_LINE_QUANTITY} onClick={() => onChange(value + 1)}><Plus aria-hidden className="h-4 w-4" /></button>
    </div>
  );
}
