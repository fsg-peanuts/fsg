import { PAYMENT_PROVIDER } from '@/lib/config/commerce';
import { DemoProvider, MobileMoneyProvider, PaystackProvider } from '@/lib/payments/providers';
import type { PaymentMethodId, PaymentService } from '@/lib/payments/types';

export type { PaymentMethodId, PaymentService } from '@/lib/payments/types';

export function getPaymentService(id: string = PAYMENT_PROVIDER): PaymentService {
  switch (id) {
    case 'paystack':
      return PaystackProvider;
    case 'mobile-money':
      return MobileMoneyProvider;
    default:
      return DemoProvider;
  }
}

export interface PaymentMethodOption {
  id: PaymentMethodId;
  label: string;
  description: string;
  enabled: boolean;
}

/** Methods shown in the payment step. Only "demo-request" is selectable on the static site. */
export function paymentMethodOptions(): PaymentMethodOption[] {
  const live = getPaymentService().isLive;
  return [
    { id: 'mobile-money', label: 'Mobile Money', description: 'Coming with live payments.', enabled: live },
    { id: 'card', label: 'Card', description: 'Coming with live payments.', enabled: live },
    {
      id: 'demo-request',
      label: 'Order request (no payment taken)',
      description: 'Send your order details to Fauzey. We confirm price, delivery and payment with you directly.',
      enabled: true,
    },
  ];
}
