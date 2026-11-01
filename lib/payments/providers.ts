import type { PaymentService } from '@/lib/payments/types';

const NOT_LIVE = 'Live payments are not enabled on this static demonstration site.';

function unavailableProvider(id: string, extra: string): PaymentService {
  const reason = `${NOT_LIVE} ${extra}`;
  return {
    id,
    isLive: false,
    async createPayment() {
      return { status: 'unavailable', reason };
    },
    async verifyPayment() {
      return { status: 'unavailable', reason };
    },
    async refundPayment() {
      return { status: 'unavailable', reason };
    },
    handleWebhook(): never {
      throw new Error('Webhooks must be handled by a server-side backend.');
    },
  };
}

/** Demonstration provider: records nothing, charges nothing. */
export const DemoProvider = unavailableProvider('demo', 'Orders are sent to Fauzey as requests.');

/** Placeholder for Paystack. Implement in a Worker/server; do not add secret keys here. */
export const PaystackProvider = unavailableProvider('paystack', 'Paystack integration requires a server-side Worker.');

/** Placeholder for Mobile Money (via Paystack or a direct aggregator). */
export const MobileMoneyProvider = unavailableProvider('mobile-money', 'Mobile Money integration requires a server-side Worker.');
