'use client';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/Field';
import { useToast } from '@/components/ui/Toast';
import { track } from '@/lib/analytics';
import { SITE } from '@/lib/config/site';
import { isEmail } from '@/lib/validation/forms';

/**
 * Static-site newsletter interface. There is no mailing-list backend yet, so submitting opens an
 * email to Fauzey asking to be added. A real list service plugs in via lib/ (adapter) later.
 */
export function NewsletterForm({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const { toast } = useToast();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) { setError('Enter a valid email address, like name@example.com.'); return; }
    setError(undefined);
    track('newsletter_interest');
    const subject = encodeURIComponent('Please add me to the Fauzey list');
    const body = encodeURIComponent(`Hello Fauzey, please add this email address to your mailing list: ${email.trim()}`);
    toast('Your email app is opening. Send the message to join the list.');
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Join the Fauzey list" className="max-w-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <TextField label="Email address" type="email" name="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error} placeholder="name@example.com" className={tone === 'dark' ? '[&_label]:text-butter' : ''} />
        </div>
        <Button type="submit" variant={tone === 'dark' ? 'light' : 'primary'} className="sm:mt-[1.7rem]">Join the list</Button>
      </div>
      <p className={`mt-3 text-sm ${tone === 'dark' ? 'text-butter/80' : 'text-muted'}`}>Joining opens an email to Fauzey. There is no automatic sign-up yet.</p>
    </form>
  );
}
