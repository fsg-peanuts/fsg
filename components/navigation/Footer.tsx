import Link from 'next/link';
import { PeanutMark } from '@/components/brand/PeanutMark';
import { CATEGORIES } from '@/lib/data/categories';
import { SITE, whatsappLink } from '@/lib/config/site';

export function Footer() {
  const link = 'text-butter/90 hover:text-snow underline-offset-4 hover:underline';
  return (
    <footer className="bg-espresso text-butter" data-tone="dark">
      <div className="page-x pb-10 pt-20 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <PeanutMark className="mb-6 h-9 w-[4.5rem] text-amber" />
            <p className="font-serif text-4xl leading-tight text-snow sm:text-5xl">The craft of the humble nut.</p>
            <p className="mt-6 max-w-sm text-[0.95rem] text-butter/90">A premium Ghanaian peanut and peanut-butter house, from {SITE.location}.</p>
          </div>
          <nav aria-label="Footer shop" className="lg:col-span-2 lg:col-start-7">
            <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-label text-almond">Shop</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              <li><Link className={link} href="/shop/">All products</Link></li>
              {CATEGORIES.map((c) => <li key={c.id}><Link className={link} href={`/shop/${c.slug}/`}>{c.name}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="Footer explore" className="lg:col-span-2">
            <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-label text-almond">Explore</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {[['Peanut Atelier', '/atelier/'], ['Our Story', '/story/'], ['Gifts', '/gifts/'], ['Build Your Box', '/gifts/build-your-box/'], ['Corporate gifting', '/gifts/corporate/'], ['Journal', '/journal/'], ['Shopping bag', '/bag/']].map(([l, h]) => (
                <li key={h}><Link className={link} href={h}>{l}</Link></li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-label text-almond">Contact</h2>
            <address className="space-y-2.5 text-[0.95rem] not-italic">
              <p><a className={link} href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
              <p>Bulk purchases: <a className={link} href={`tel:${SITE.bulkPhone}`}>{SITE.bulkPhoneDisplay}</a></p>
              <p><a className={link} href={whatsappLink()} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></p>
              <p className="text-butter/80">{SITE.location}</p>
              <p><Link className={link} href="/contact/">Contact page</Link></p>
            </address>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-chestnut pt-6 text-xs text-butter/80 sm:flex-row sm:justify-between">
          <p>© 2026 {SITE.name}. All rights reserved.</p>
          <p>Checkout on this website is a demonstration: no payment is taken online.</p>
        </div>
      </div>
    </footer>
  );
}
