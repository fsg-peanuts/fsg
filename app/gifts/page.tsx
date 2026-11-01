import Link from 'next/link';
import { ProductCard } from '@/components/commerce/ProductCard';
import { ButtonLink } from '@/components/ui/Button';
import { getProduct } from '@/lib/data/catalogue';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Gifts', description: 'Fauzey gift collections, a Build Your Fauzey Box experience, and corporate gifting enquiries.', path: '/gifts/' });

export default function GiftsPage() {
  const gifts = ['crunchy-peanuts-collection', 'peanut-butter-collection'].map((s) => getProduct(s)!);
  return (
    <div className="pb-24">
      <header className="bg-butter">
        <div className="page-x py-16 sm:py-24">
          <h1 className="display-lg max-w-3xl">Gifts, from the Fauzey table</h1>
          <p className="lede mt-6 max-w-xl">Collection packs, a box you fill yourself, and gifting for teams and events.</p>
        </div>
      </header>

      <section aria-labelledby="coll" className="page-x section-y !pb-12">
        <h2 id="coll" className="display-md mb-10">Gift collections</h2>
        <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:max-w-4xl">
          {gifts.map((p) => <li key={p.slug}><ProductCard product={p} ratio="1 / 1" /></li>)}
        </ul>
      </section>

      <section className="page-x grid gap-px border border-rule bg-rule md:grid-cols-2">
        <div className="bg-snow p-8 sm:p-12">
          <h2 className="text-4xl">Build Your Fauzey Box</h2>
          <p className="mt-3 max-w-sm text-muted">Pick a box of 3, 5 or 8 items and fill it with the products you want to give.</p>
          <div className="mt-6"><ButtonLink href="/gifts/build-your-box/">Start building</ButtonLink></div>
        </div>
        <div className="bg-snow p-8 sm:p-12">
          <h2 className="text-4xl">Corporate gifting</h2>
          <p className="mt-3 max-w-sm text-muted">Gifts for staff, clients and events. Tell us what you need and we will respond.</p>
          <div className="mt-6"><ButtonLink href="/gifts/corporate/" variant="secondary">Send an enquiry</ButtonLink></div>
        </div>
      </section>
      <p className="page-x mt-8 text-sm text-muted">Need a large order? <Link href="/contact/" className="underline underline-offset-4">Contact us</Link> about bulk purchases.</p>
    </div>
  );
}
