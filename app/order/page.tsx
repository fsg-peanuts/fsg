import { Suspense } from 'react';
import { OrderConfirmation } from '@/components/checkout/OrderConfirmation';
import { Skeleton } from '@/components/ui/Skeleton';
import { pageMetadata } from '@/lib/seo';

export const metadata = { ...pageMetadata({ title: 'Order request', description: 'Your Fauzey order request.', path: '/order/' }), robots: { index: false, follow: false } };

export default function OrderPage() {
  return (
    <div className="page-x pb-28 pt-14 sm:pt-20">
      <Suspense fallback={<Skeleton className="h-96 w-full" />}><OrderConfirmation /></Suspense>
    </div>
  );
}
