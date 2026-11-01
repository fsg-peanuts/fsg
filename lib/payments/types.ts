/**
 * Payment adapter contract (Blueprint §15). The storefront depends on `PaymentService`,
 * never on a vendor SDK. Real providers MUST run server-side (e.g. a Cloudflare Worker):
 * secret keys can never live in this static site.
 */
export type PaymentMethodId = 'mobile-money' | 'card' | 'demo-request';

export interface PaymentRequest {
  orderReference: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerPhone: string;
  method: PaymentMethodId;
}

export type PaymentResult =
  | { status: 'unavailable'; reason: string }
  | { status: 'requires_action'; redirectUrl: string; providerReference: string }
  | { status: 'pending'; providerReference: string };

export interface PaymentService {
  readonly id: string;
  readonly isLive: boolean;
  createPayment(request: PaymentRequest): Promise<PaymentResult>;
  verifyPayment(providerReference: string): Promise<{ status: 'unavailable'; reason: string }>;
  refundPayment(providerReference: string): Promise<{ status: 'unavailable'; reason: string }>;
  /** Webhooks are received by the backend, never by the browser. */
  handleWebhook(): never;
}
