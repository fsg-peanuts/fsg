/**
 * Analytics adapter (Blueprint §26). Intentionally a no-op: no third-party scripts, no cookies.
 * Wire a privacy-respecting provider here later without touching UI components.
 */
export type AnalyticsEvent =
  | 'page_view' | 'product_view' | 'search' | 'category_view' | 'add_to_bag' | 'remove_from_bag'
  | 'begin_checkout' | 'checkout_step' | 'order_request_created' | 'gift_builder_started'
  | 'gift_box_completed' | 'newsletter_interest';

export function track(event: AnalyticsEvent, data?: Record<string, unknown>): void {
  if (process.env.NODE_ENV === 'development') console.debug('[analytics]', event, data ?? {});
}
