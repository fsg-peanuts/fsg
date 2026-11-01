import type { BagSummary } from '@/lib/commerce/bag';
import { formatMoney, PRICE_PENDING_LABEL } from '@/lib/commerce/format';
import { LAST_ORDER_STORAGE_KEY } from '@/lib/config/commerce';
import { SITE, whatsappLink } from '@/lib/config/site';
import type { OrderItemSnapshot } from '@/lib/domain/types';
import type { ContactDetails, DeliveryDetails } from '@/lib/validation/forms';

/** A demonstration order *request*. It is stored only in this browser. No payment, no fulfilment. */
export interface OrderRequest {
  reference: string;
  createdAt: string;
  mode: 'demo';
  contact: ContactDetails;
  delivery: DeliveryDetails;
  items: OrderItemSnapshot[];
  pricedSubtotal: number | null;
}

export function makeReference(now = new Date()): string {
  const d = now.toISOString().slice(2, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `REQ-${d}-${rand}`;
}

export function buildOrderRequest(contact: ContactDetails, delivery: DeliveryDetails, bag: BagSummary): OrderRequest {
  return {
    reference: makeReference(),
    createdAt: new Date().toISOString(),
    mode: 'demo',
    contact,
    delivery,
    items: bag.lines.map((l) => ({
      sku: l.variant.sku,
      productName: l.product.name,
      sizeLabel: l.variant.sizeLabel,
      quantity: l.quantity,
      unitPrice: l.unitPrice,
    })),
    pricedSubtotal: bag.fullyPriced ? bag.subtotal : null,
  };
}

export function saveOrderRequest(order: OrderRequest): void {
  try { localStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(order)); } catch { /* storage unavailable */ }
}

export function loadOrderRequest(reference?: string | null): OrderRequest | null {
  try {
    const raw = localStorage.getItem(LAST_ORDER_STORAGE_KEY);
    if (!raw) return null;
    const order = JSON.parse(raw) as OrderRequest;
    return !reference || order.reference === reference ? order : null;
  } catch { return null; }
}

export function orderRequestMessage(order: OrderRequest): string {
  const lines = order.items.map(
    (i) => `- ${i.quantity} x ${i.productName} (${i.sizeLabel})${i.unitPrice === null ? '' : ` @ ${formatMoney(i.unitPrice)}`}`,
  );
  return [
    `Hello ${SITE.name}, I would like to place an order request (${order.reference}).`,
    '',
    ...lines,
    '',
    order.pricedSubtotal === null ? `Subtotal: ${PRICE_PENDING_LABEL.toLowerCase()}` : `Subtotal: ${formatMoney(order.pricedSubtotal)}`,
    '',
    `Name: ${order.contact.fullName}`,
    `Phone: ${order.contact.phone}`,
    `Email: ${order.contact.email}`,
    `Delivery: ${[order.delivery.addressLine1, order.delivery.addressLine2, order.delivery.city, order.delivery.region].filter(Boolean).join(', ')}`,
    order.delivery.instructions ? `Instructions: ${order.delivery.instructions}` : '',
  ].filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n');
}

export const orderRequestWhatsAppLink = (order: OrderRequest) => whatsappLink(orderRequestMessage(order));
