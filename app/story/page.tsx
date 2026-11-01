import Link from 'next/link';
import { ProductImage } from '@/components/commerce/ProductImage';
import { ButtonLink } from '@/components/ui/Button';
import { SITE } from '@/lib/config/site';
import { CATEGORIES } from '@/lib/data/categories';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Our Story', description: 'Fauzey Peanut is a Ghanaian peanut and peanut-butter house from Atimatim - Chairman. Read about our philosophy: the craft of the humble nut.', path: '/story/' });

export default function StoryPage() {
  return (
    <div>
      <header className="bg-butter">
        <div className="page-x py-20 sm:py-32">
          <h1 className="display-xl max-w-5xl">The craft of the humble nut.</h1>
        </div>
      </header>

      <section className="page-x section-y grid gap-12 lg:grid-cols-12">
        <h2 className="display-md lg:col-span-4">Ghanaian roots</h2>
        <div className="prose-fz lg:col-span-6 lg:col-start-6">
          <p>Fauzey Peanut comes from {SITE.location}. Our products are made by {SITE.manufacturer}.</p>
          <p>Groundnut is everyday food in Ghana. It is in the soup pot, in the snack bag and on the breakfast table. We start from that familiarity and take it seriously.</p>
        </div>
      </section>

      <section className="bg-snow">
        <div className="page-x section-y grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <ProductImage stem="PB_250g" alt="Fauzey's Peanut Butter, 250g" name="Fauzey’s Peanut Butter" sizeLabel="250g" ratio="4 / 5" className="border border-rule" zoom={false} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="display-md">One ingredient is enough.</h2>
            <div className="prose-fz mt-6">
              <p>Fauzey’s Peanut Butter and Fauzey’s Crunchy Peanuts list a single ingredient: groundnut. We think that is a good place to begin.</p>
              <p>From there, we make the products people reach for every day: crunchy peanuts, roasted salted peanuts, a chilli and lime mix, peanut flour for the kitchen, and a gourmet peanut brittle.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-x section-y">
        <h2 className="display-md mb-10 max-w-xl">How we think about food</h2>
        <dl className="grid gap-px border border-rule bg-rule md:grid-cols-3">
          {[
            ['Simple', 'Short ingredient lists. Food that tastes of what it is.'],
            ['Open', 'Every pack shows its details: weight, dates, batch, manufacturer and regulatory references.'],
            ['Shared', 'Peanuts are made for the table, for gifts and for celebrating. We make them for sharing.'],
          ].map(([t, d]) => (
            <div key={t} className="bg-cream p-8 sm:p-10">
              <dt className="font-serif text-4xl text-espresso">{t}</dt>
              <dd className="mt-4 text-[0.97rem]">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-espresso text-butter" data-tone="dark">
        <div className="page-x section-y">
          <h2 className="display-md !text-snow">The Fauzey range</h2>
          <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => <li key={c.id} className="border-t border-chestnut py-4"><Link href={`/shop/${c.slug}/`} className="link-underline font-serif text-3xl text-snow">{c.name}</Link><p className="mt-1 text-sm text-butter/85">{c.summary}</p></li>)}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/shop/" variant="light" size="lg">Shop the collection</ButtonLink>
            <ButtonLink href="/contact/" variant="secondary" size="lg" className="!border-butter !text-butter hover:!bg-butter hover:!text-espresso">Get in touch</ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
