'use client';
import { AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useBag } from '@/components/providers/BagProvider';
import { buttonClass } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { SelectField, TextArea, TextField } from '@/components/ui/Field';
import { Skeleton } from '@/components/ui/Skeleton';
import { track } from '@/lib/analytics';
import { CHECKOUT_MODE } from '@/lib/config/commerce';
import { buildOrderRequest, saveOrderRequest } from '@/lib/orders';
import { getPaymentService, paymentMethodOptions, type PaymentMethodId } from '@/lib/payments';
import { GHANA_REGIONS, hasErrors, validateContact, validateDelivery, type ContactDetails, type DeliveryDetails, type Errors } from '@/lib/validation/forms';

const STEPS = ['Contact', 'Delivery', 'Payment'] as const;

export function CheckoutFlow() {
  const router = useRouter();
  const { summary, hydrated, clear } = useBag();
  const [step, setStep] = useState(0);
  const [contact, setContact] = useState<ContactDetails>({ fullName: '', email: '', phone: '' });
  const [delivery, setDelivery] = useState<DeliveryDetails>({ addressLine1: '', addressLine2: '', city: '', region: '', instructions: '' });
  const [cErr, setCErr] = useState<Errors<keyof ContactDetails>>({});
  const [dErr, setDErr] = useState<Errors<keyof DeliveryDetails>>({});
  const [method, setMethod] = useState<PaymentMethodId>('demo-request');
  const heading = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const firstRender = useRef(true);

  useEffect(() => { if (hydrated && summary.lines.length) track('begin_checkout'); }, [hydrated, summary.lines.length > 0]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (firstRender.current) { firstRender.current = false; return; } heading.current?.focus(); track('checkout_step', { step }); }, [step]);

  if (!hydrated) return <div className="grid gap-10 lg:grid-cols-12" role="status" aria-label="Loading checkout"><Skeleton className="h-96 lg:col-span-7" /><Skeleton className="h-72 lg:col-span-5" /></div>;
  if (summary.lines.length === 0) {
    return <EmptyState title="Your bag is empty" action={<Link href="/shop/" className={buttonClass('primary')}>Shop the collection</Link>}>Add something to your bag before you check out.</EmptyState>;
  }

  const provider = getPaymentService();
  const liveBlocked = CHECKOUT_MODE === 'live' && !(summary.fullyPriced && provider.isLive);
  const focusFirst = (errs: object) => formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();

  function next(e: FormEvent) {
    e.preventDefault();
    if (step === 0) { const f = validateContact(contact); setCErr(f); if (hasErrors(f)) return focusFirst(f); setStep(1); }
    else if (step === 1) { const f = validateDelivery(delivery); setDErr(f); if (hasErrors(f)) return focusFirst(f); setStep(2); }
    else if (!liveBlocked) {
      const order = buildOrderRequest(contact, delivery, summary);
      saveOrderRequest(order);
      track('order_request_created', { reference: order.reference });
      clear();
      router.push(`/order/?ref=${encodeURIComponent(order.reference)}`);
    }
  }

  const upC = (k: keyof ContactDetails) => (e: { target: { value: string } }) => setContact((s) => ({ ...s, [k]: e.target.value }));
  const upD = (k: keyof DeliveryDetails) => (e: { target: { value: string } }) => setDelivery((s) => ({ ...s, [k]: e.target.value }));

  return (
    <div>
      <div role="note" className="mb-10 flex gap-3 border border-espresso bg-butter p-4 sm:p-5">
        <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-espresso" />
        <div className="text-[0.95rem]">
          <p className="font-semibold text-espresso">Demonstration checkout. No payment is taken.</p>
          <p className="mt-1">This website cannot process payments or store orders yet. When you finish, you get an order request to send to Fauzey by WhatsApp or email. Prices, delivery and payment are agreed with Fauzey directly.</p>
        </div>
      </div>

      <ol className="mb-10 flex gap-2 sm:gap-6" aria-label="Checkout steps">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? 'step' : undefined} className={`flex flex-1 items-center gap-3 border-t-2 pt-3 text-sm ${i <= step ? 'border-espresso text-espresso' : 'border-rule text-muted'}`}>
            <span className="font-semibold">{i + 1}</span><span className={i === step ? 'font-semibold' : ''}>{s}</span>
          </li>
        ))}
      </ol>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <form ref={formRef} onSubmit={next} noValidate className="space-y-6 lg:col-span-7" aria-label={`Checkout: ${STEPS[step]}`}>
          <h2 ref={heading} tabIndex={-1} className="text-4xl outline-none">{step === 0 ? 'Your details' : step === 1 ? 'Delivery' : 'Review and payment'}</h2>

          {step === 0 && (
            <div className="space-y-5">
              <TextField label="Full name" name="fullName" autoComplete="name" value={contact.fullName} onChange={upC('fullName')} error={cErr.fullName} />
              <TextField label="Email" name="email" type="email" autoComplete="email" inputMode="email" value={contact.email} onChange={upC('email')} error={cErr.email} />
              <TextField label="Telephone number" name="phone" type="tel" autoComplete="tel" inputMode="tel" hint="For example 024 123 4567 or +233 24 123 4567." value={contact.phone} onChange={upC('phone')} error={cErr.phone} />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <TextField label="Delivery address" name="addressLine1" autoComplete="address-line1" value={delivery.addressLine1} onChange={upD('addressLine1')} error={dErr.addressLine1} hint="Street, house number, area or landmark." />
              <TextField label="Apartment, suite or additional details" name="addressLine2" autoComplete="address-line2" optional value={delivery.addressLine2} onChange={upD('addressLine2')} />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="Town or city" name="city" autoComplete="address-level2" value={delivery.city} onChange={upD('city')} error={dErr.city} />
                <SelectField label="Region" name="region" autoComplete="address-level1" value={delivery.region} onChange={upD('region')} error={dErr.region}>
                  <option value="">Choose a region</option>
                  {GHANA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </SelectField>
              </div>
              <TextArea label="Delivery instructions" name="instructions" optional rows={3} value={delivery.instructions} onChange={upD('instructions')} error={dErr.instructions} hint="Gate colour, nearest landmark, best time to call." />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <dl className="grid gap-4 border border-rule bg-snow p-5 text-sm sm:grid-cols-2">
                <div><dt className="font-semibold text-espresso">Contact</dt><dd>{contact.fullName}<br />{contact.email}<br />{contact.phone}</dd></div>
                <div><dt className="font-semibold text-espresso">Delivery</dt><dd>{delivery.addressLine1}{delivery.addressLine2 ? `, ${delivery.addressLine2}` : ''}<br />{delivery.city}, {delivery.region}{delivery.instructions && <><br /><span className="text-muted">{delivery.instructions}</span></>}</dd></div>
              </dl>
              <fieldset>
                <legend className="mb-3 font-serif text-2xl text-espresso">Payment method</legend>
                <div className="space-y-3">
                  {paymentMethodOptions().map((m) => (
                    <label key={m.id} className={`flex gap-4 border p-4 ${m.enabled ? 'cursor-pointer border-rule bg-snow has-[:checked]:border-espresso has-[:checked]:bg-butter/50' : 'cursor-not-allowed border-rule bg-cream opacity-70'}`}>
                      <input type="radio" name="payment" className="mt-1.5 h-4 w-4 accent-espresso" disabled={!m.enabled} checked={method === m.id} onChange={() => setMethod(m.id)} />
                      <span><span className="block font-semibold text-espresso">{m.label}{!m.enabled && <span className="ml-2 text-xs font-normal text-muted">Not yet available</span>}</span><span className="text-sm text-muted">{m.description}</span></span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {liveBlocked && (
                <div role="alert" className="flex gap-3 border border-espresso bg-snow p-4 text-sm"><AlertTriangle aria-hidden className="mt-0.5 h-5 w-5 shrink-0" /><p>Online payment is switched off until every item has a configured price and a payment provider is connected. You cannot place a payable order right now.</p></div>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className={buttonClass('secondary')}>Back</button>}
            <button type="submit" disabled={step === 2 && liveBlocked} className={buttonClass('primary', 'lg')}>{step === 0 ? 'Continue to delivery' : step === 1 ? 'Continue to payment' : 'Create order request'}</button>
          </div>
        </form>

        <div className="lg:col-span-5"><div className="lg:sticky lg:top-24"><OrderSummary /></div></div>
      </div>
    </div>
  );
}
