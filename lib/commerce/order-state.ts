import type { OrderStatus } from '@/lib/domain/types';

/** Blueprint §16. Transitions must be enforced by the backend; this is the shared contract. */
const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING_PAYMENT: ['PAID', 'PAYMENT_FAILED', 'CANCELLED'],
  PAYMENT_FAILED: ['PENDING_PAYMENT', 'CANCELLED'],
  PAID: ['PROCESSING', 'REFUNDED', 'CANCELLED'],
  PROCESSING: ['PACKED', 'CANCELLED', 'REFUNDED'],
  PACKED: ['DISPATCHED', 'CANCELLED'],
  DISPATCHED: ['DELIVERED', 'RETURNED'],
  DELIVERED: ['RETURNED', 'REFUNDED'],
  RETURNED: ['REFUNDED'],
  CANCELLED: [],
  REFUNDED: [],
};

export const canTransition = (from: OrderStatus, to: OrderStatus) => TRANSITIONS[from].includes(to);
export const nextStatuses = (from: OrderStatus) => TRANSITIONS[from];
