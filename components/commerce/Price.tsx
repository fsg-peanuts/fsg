import { formatMoney, PRICE_PENDING_LABEL } from '@/lib/commerce/format';

export function Price({ amount, prefix, className = '' }: { amount: number | null; prefix?: string; className?: string }) {
  if (amount === null) return <span className={`text-sm italic text-muted ${className}`}>{PRICE_PENDING_LABEL}</span>;
  return <span className={`font-medium text-espresso ${className}`}>{prefix ? `${prefix} ` : ''}{formatMoney(amount)}</span>;
}
