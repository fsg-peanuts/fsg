import { MessageCircle } from 'lucide-react';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { buttonClass } from '@/components/ui/Button';
import { SITE, whatsappLink } from '@/lib/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Contact', description: `Contact Fauzey Peanut by email at ${SITE.email}, call ${SITE.bulkPhoneDisplay} for bulk purchases, or message us on WhatsApp.`, path: '/contact/' });

export default function ContactPage() {
  return (
    <div className="page-x grid gap-14 pb-28 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-20">
      <div className="lg:col-span-5">
        <h1 className="display-lg">Contact</h1>
        <p className="lede mt-5">Questions about a product, an order or a bulk purchase? We would like to hear from you.</p>
        <address className="mt-10 space-y-6 not-italic">
          <div><p className="text-sm font-semibold text-espresso">Email</p><a className="font-serif text-2xl underline underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
          <div><p className="text-sm font-semibold text-espresso">Bulk purchases</p><a className="font-serif text-2xl underline underline-offset-4" href={`tel:${SITE.bulkPhone}`}>{SITE.bulkPhoneDisplay}</a></div>
          <div><p className="text-sm font-semibold text-espresso">Location</p><p className="font-serif text-2xl">{SITE.location}</p></div>
        </address>
        <a href={whatsappLink('Hello Fauzey, I have a question.')} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'lg', 'mt-10')}><MessageCircle aria-hidden className="h-4 w-4" />Message us on WhatsApp</a>
      </div>
      <div className="lg:col-span-7">
        <h2 className="mb-6 text-4xl">Send an enquiry</h2>
        <EnquiryForm kind="contact" />
      </div>
    </div>
  );
}
