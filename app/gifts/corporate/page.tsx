import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { SITE } from '@/lib/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Corporate gifting', description: 'Enquire about Fauzey corporate gifts and bulk purchases for teams, clients and events.', path: '/gifts/corporate/' });

export default function CorporatePage() {
  return (
    <div className="page-x grid gap-14 pb-28 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-20">
      <header className="lg:col-span-5">
        <h1 className="display-lg">Corporate gifting</h1>
        <p className="lede mt-5">Planning gifts for a team, a client list or an event? Tell us what you need.</p>
        <p className="mt-8 text-[0.97rem]">For bulk purchases you can also call <a className="font-semibold underline underline-offset-4" href={`tel:${SITE.bulkPhone}`}>{SITE.bulkPhoneDisplay}</a>.</p>
      </header>
      <div className="lg:col-span-7"><EnquiryForm kind="corporate" /></div>
    </div>
  );
}
