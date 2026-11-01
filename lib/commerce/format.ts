import { CURRENCY, CURRENCY_DISPLAY, CURRENCY_LOCALE } from '@/lib/config/commerce';

/** Configurable GHS formatter. Never called with `null`: use <Price> for unpriced items. */
export function formatMoney(amount: number, currency: string = CURRENCY, display: 'code' | 'symbol' = CURRENCY_DISPLAY): string {
  if (display === 'symbol') {
    return new Intl.NumberFormat(CURRENCY_LOCALE, { style: 'currency', currency }).format(amount);
  }
  const n = new Intl.NumberFormat(CURRENCY_LOCALE, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  return `${currency} ${n}`;
}

export const PRICE_PENDING_LABEL = 'Price awaiting configuration';
