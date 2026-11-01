'use client';
import { Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { buttonClass } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatMoney } from '@/lib/commerce/format';
import { SITE } from '@/lib/config/site';
import { loadOrderRequest, orderRequestMessage, orderRequestWhatsAppLink, type OrderRequest } from '@/lib/orders';

export function OrderConfirmation() {
  const ref = useSearchParams().get('ref');
  const [order, setOrder] = useState<OrderRequest | null | undefined>(undefined);
  useEffect(() => { setOrder(loadOrderRequest(ref)); }, [ref]);

  if (order === undefined) return <Skeleton className="h-96 w-full" />;
  if (!order) return <EmptyState level={1} title="We can’t find that order request" action={<Link href="/shop/" className={buttonClass('primary')}>Back to the shop</Link>}>Order requests are kept only in the browser they were made in.</EmptyState>;

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(`Order request ${order.reference}`)}&body=${encodeURIComponent(orderRequestMessage(order))}`;
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <p role="status" className="inline-block border border-espresso bg-butter px-4 py-2 text-sm font-semibold text-espresso">Demonstration. No payment taken, no order placed online.</p>
        <h1 className="display-lg mt-6">Your order request is ready.</h1>
        <p className="lede mt-5">Reference <strong className="font-semibold">{order.reference}</strong>. Send it to Fauzey to continue.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={orderRequestWhatsAppLink(order)} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'lg')}><MessageCircle aria-hidden className="h-4 w-4" />Send on WhatsApp</a>
          <a href={mailto} className={buttonClass('secondary', 'lg')}><Mail aria-hidden className="h-4 w-4" />Send by email</a>
        </div>
        <h2 className="mt-14 text-3xl">What happens next</h2>
        <ol className="mt-4 max-w-lg list-decimal space-y-2 pl-5">
          <li>Send your request to Fauzey using one of the buttons above.</li>
          <li>Fauzey confirms prices, the delivery fee and how to pay.</li>
          <li>Your order is prepared once everything is agreed.</li>
        </ol>
        <p className="mt-6 text-sm text-muted">This request is saved only in this browser. For help, call <a className="underline underline-offset-4" href={`tel:${SITE.bulkPhone}`}>{SITE.bulkPhoneDisplay}</a>.</p>
      </div>
      <aside className="border border-rule bg-snow p-6 lg:col-span-5 lg:self-start" aria-labelledby="req-title">
        <h2 id="req-title" className="text-3xl">Your request</h2>
        <ul className="mt-4 divide-y divide-rule text-sm">
          {order.items.map((i) => <li key={i.sku} className="flex justify-between gap-4 py-2"><span>{i.quantity} × {i.productName}</span><span className="text-muted">{i.sizeLabel}{i.unitPrice !== null ? `, ${formatMoney(i.unitPrice * i.quantity)}` : ''}</span></li>)}
        </ul>
        <p className="mt-4 text-sm"><span className="font-semibold text-espresso">Subtotal:</span> {order.pricedSubtotal === null ? <span className="italic text-muted">Price awaiting configuration</span> : formatMoney(order.pricedSubtotal)}</p>
        <div className="mt-5 border-t border-rule pt-4 text-sm"><p className="font-semibold text-espresso">Deliver to</p><p>{order.contact.fullName}, {order.contact.phone}<br />{order.delivery.addressLine1}{order.delivery.addressLine2 ? `, ${order.delivery.addressLine2}` : ''}<br />{order.delivery.city}, {order.delivery.region}</p></div>
      </aside>
    </div>
  );
}
