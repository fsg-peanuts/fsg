/**
 * Commerce configuration.
 *
 * CHECKOUT_MODE
 *  - "demo": the static GitHub Pages default. No payment is taken and no order is placed.
 *            Checkout produces an order *request* the customer can send on WhatsApp.
 *  - "live": reserved for a future deployment with a real backend (e.g. Cloudflare Worker)
 *            that validates prices/inventory server-side and talks to a payment provider.
 *            Live mode is refused by the UI unless every line is priced AND a provider is
 *            configured, so it can never silently take a "payment" on a static site.
 */
export type CheckoutMode = 'demo' | 'live';

export const CHECKOUT_MODE: CheckoutMode =
  process.env.NEXT_PUBLIC_CHECKOUT_MODE === 'live' ? 'live' : 'demo';

export const PAYMENT_PROVIDER = process.env.NEXT_PUBLIC_PAYMENT_PROVIDER ?? 'none';

export const CURRENCY = 'GHS';
export const CURRENCY_LOCALE = 'en-GH';
/** "code" => "GHS 25.00"; "symbol" => "GH₵25.00" */
export const CURRENCY_DISPLAY: 'code' | 'symbol' = 'code';

export const MAX_LINE_QUANTITY = 99;
export const BAG_STORAGE_KEY = 'fauzey.bag.v1';
export const LAST_ORDER_STORAGE_KEY = 'fauzey.lastOrderRequest.v1';
