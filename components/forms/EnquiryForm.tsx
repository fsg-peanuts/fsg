'use client';
import { Mail, MessageCircle } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { buttonClass } from '@/components/ui/Button';
import { TextArea, TextField } from '@/components/ui/Field';
import { SITE, whatsappLink } from '@/lib/config/site';
import { hasErrors, validateEnquiry, type EnquiryDetails, type Errors } from '@/lib/validation/forms';

type Kind = 'contact' | 'corporate';
const empty: EnquiryDetails = { name: '', email: '', phone: '', message: '', organisation: '' };

/** No server: a validated enquiry becomes a ready-to-send email or WhatsApp message. */
export function EnquiryForm({ kind }: { kind: Kind }) {
  const [v, setV] = useState<EnquiryDetails>(empty);
  const [errors, setErrors] = useState<Errors<keyof EnquiryDetails>>({});
  const [ready, setReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const corporate = kind === 'corporate';

  const set = (k: keyof EnquiryDetails) => (e: { target: { value: string } }) => { setV((s) => ({ ...s, [k]: e.target.value })); setReady(false); };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateEnquiry(v, corporate);
    setErrors(found);
    if (hasErrors(found)) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setReady(false);
      return;
    }
    setReady(true);
  }

  const subject = corporate ? `Corporate gifting enquiry${v.organisation ? `: ${v.organisation}` : ''}` : 'Enquiry from the Fauzey website';
  const body = [v.message.trim(), '', `Name: ${v.name.trim()}`, corporate && v.organisation ? `Organisation: ${v.organisation.trim()}` : '', `Email: ${v.email.trim()}`, v.phone.trim() ? `Phone: ${v.phone.trim()}` : ''].filter(Boolean).join('\n');
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const wa = whatsappLink(`${subject}\n\n${body}`);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-label={corporate ? 'Corporate gifting enquiry' : 'Contact enquiry'}>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Your name" name="name" autoComplete="name" value={v.name} onChange={set('name')} error={errors.name} />
        {corporate && <TextField label="Organisation" name="organisation" autoComplete="organization" value={v.organisation ?? ''} onChange={set('organisation')} error={errors.organisation} />}
        <TextField label="Email" name="email" type="email" autoComplete="email" inputMode="email" value={v.email} onChange={set('email')} error={errors.email} />
        <TextField label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" optional value={v.phone} onChange={set('phone')} error={errors.phone} />
      </div>
      <TextArea label={corporate ? 'What are you planning?' : 'Your message'} name="message" value={v.message} onChange={set('message')} error={errors.message} hint={corporate ? 'Tell us about the occasion, how many gifts you need, and when you need them.' : undefined} />
      <button type="submit" className={buttonClass('primary', 'lg')}>Prepare my message</button>

      {ready && (
        <div role="status" className="border border-espresso bg-snow p-5">
          <p className="font-serif text-2xl text-espresso">Your message is ready.</p>
          <p className="mt-1 text-sm text-muted">This website has no server to receive forms. Choose how to send it, and it goes straight to Fauzey.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={mailto} className={buttonClass('primary')}><Mail aria-hidden className="h-4 w-4" />Send by email</a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary')}><MessageCircle aria-hidden className="h-4 w-4" />Send on WhatsApp</a>
          </div>
        </div>
      )}
    </form>
  );
}
