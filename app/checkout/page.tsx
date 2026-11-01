import { CheckoutFlow } from '@/components/checkout/CheckoutFlow';
import { pageMetadata } from '@/lib/seo';

export const metadata = { ...pageMetadata({ title: 'Checkout', description: 'Complete your Fauzey order request.', path: '/checkout/' }), robots: { index: false, follow: true } };

export default function CheckoutPage() {
  return (
    <div className="page-x pb-28 pt-14 sm:pt-20">
      <h1 className="display-lg mb-10">Checkout</h1>
      <CheckoutFlow />
    </div>
  );
}
