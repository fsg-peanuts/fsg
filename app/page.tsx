import Link from 'next/link';
import { ProductCard } from '@/components/commerce/ProductCard';
import { ProductImage } from '@/components/commerce/ProductImage';
import { CollectionTiles } from '@/components/editorial/CollectionTiles';
import { Hero } from '@/components/editorial/Hero';
import { JournalCard } from '@/components/editorial/JournalCard';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { SITE } from '@/lib/config/site';
import { getProduct } from '@/lib/data/catalogue';
import { ARTICLES } from '@/lib/data/journal';
import { pageMetadata } from '@/lib/seo';
import { SITE_URL } from '@/lib/utils/assets';

export const metadata = pageMetadata({
  title: `${SITE.name} | ${SITE.statement}`,
  description: SITE.description,
  path: '/',
});

const CRAFT = [
  ['Simple ingredients', 'Fauzey’s Peanut Butter and Crunchy Peanuts list one ingredient: groundnut.'],
  ['Honest details', 'Net weight, manufacture and expiry dates and batch number are printed on every pack.'],
  ['Registered and referenced', 'Regulatory references appear on the products they belong to.'],
  ['Stored simply', 'Keep your pack in a cool, dry place. Nothing complicated.'],
] as const;

export default function HomePage() {
  const pb = getProduct('peanut-butter')!;
  const cp = getProduct('crunchy-peanuts')!;
  const gifts = ['crunchy-peanuts-collection', 'peanut-butter-collection'].map((s) => getProduct(s)!);

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Organization', name: SITE.name, legalName: SITE.manufacturer, url: `${SITE_URL}/`, email: SITE.email, telephone: SITE.bulkPhone, address: { '@type': 'PostalAddress', addressLocality: 'Atimatim - Chairman', addressCountry: 'GH' } }} />
      <Hero />

      <section className="section-y page-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="lede lg:col-span-7 lg:col-start-2" style={{ fontSize: 'clamp(1.7rem, 3.4vw, 3rem)', lineHeight: 1.18 }}>
            Fauzey Peanut is a Ghanaian peanut and peanut-butter house. We believe the humble groundnut deserves to be treated like a fine ingredient: kept simple, made with care, and set at the centre of the table.
          </p>
        </div>
      </section>

      <section aria-labelledby="peanut-title" className="bg-snow">
        <div className="page-x section-y grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <ProductImage stem="CP_500g" alt="Fauzey's Crunchy Peanuts, 500g" name="Fauzey’s Crunchy Peanuts" sizeLabel="500g" ratio="4 / 5" className="border border-rule" sizes="(min-width:1024px) 40vw, 100vw" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="peanut-title" className="display-lg">It begins with the peanut.</h2>
            <div className="prose-fz mt-8">
              <p>In Ghana it is often called groundnut. Whatever you call it, the idea is the same: start with a simple ingredient and let it speak.</p>
              <p>That is why Fauzey’s Peanut Butter and Fauzey’s Crunchy Peanuts each list a single ingredient. Groundnut, and nothing else on the list.</p>
            </div>
            <Link href="/journal/peanut-or-groundnut/" className="link-underline mt-2 font-semibold text-espresso">Peanut or groundnut? Read the guide</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="craft-title" className="bg-espresso text-butter" data-tone="dark">
        <div className="page-x section-y">
          <div className="grid gap-8 lg:grid-cols-12">
            <h2 id="craft-title" className="display-lg !text-snow lg:col-span-6">The craft is in the details.</h2>
            <p className="max-w-md self-end text-[1.05rem] text-butter/90 lg:col-span-4 lg:col-start-9">Good food starts with a short ingredient list and ends with a label you can check. This is how we look at it.</p>
          </div>
          <ul className="mt-16 grid gap-x-10 gap-y-10 border-t border-chestnut pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {CRAFT.map(([t, d]) => (
              <li key={t}>
                <h3 className="font-serif text-3xl !text-snow">{t}</h3>
                <p className="mt-3 text-[0.97rem] text-butter/90">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="collection-title" className="section-y page-x">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 id="collection-title" className="display-lg">The collection</h2>
          <Link href="/shop/" className="link-underline font-semibold text-espresso">Shop everything</Link>
        </div>
        <CollectionTiles />
      </section>

      <section aria-labelledby="essentials-title" className="bg-butter">
        <div className="page-x section-y">
          <div className="mb-12 max-w-2xl">
            <h2 id="essentials-title" className="display-md">Begin with the essentials</h2>
            <p className="mt-4 text-[1.02rem]">Two Fauzey classics, each made with groundnut as the only ingredient.</p>
          </div>
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:max-w-4xl">
            {[pb, cp].map((p) => <li key={p.slug}><ProductCard product={p} ratio="1 / 1" /></li>)}
          </ul>
        </div>
      </section>

      <section aria-labelledby="atelier-title" className="section-y page-x">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="atelier-title" className="display-lg">The Peanut Atelier</h2>
            <p className="lede mt-6">Tell us how you like to eat, and we will point you to the right Fauzey.</p>
            <div className="mt-8"><ButtonLink href="/atelier/" size="lg">Find your Fauzey</ButtonLink></div>
          </div>
          <ul className="flex flex-wrap gap-3 lg:col-span-6 lg:col-start-7 lg:pt-4" aria-label="Atelier preferences">
            {['Crunchy', 'Smooth and ground', 'Roasted', 'Chilli and lime', 'Snacking', 'Spreading', 'Cooking', 'Baking'].map((t, i) => (
              <li key={t}>
                <Link href="/atelier/" className={`inline-block border px-6 py-4 font-serif text-2xl transition-colors hover:bg-espresso hover:text-snow ${i % 3 === 0 ? 'border-espresso' : 'border-rule bg-snow'}`}>{t}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="gifts-title" className="bg-snow">
        <div className="page-x section-y">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 id="gifts-title" className="display-lg">Gifts, from the Fauzey table</h2>
            <Link href="/gifts/" className="link-underline font-semibold text-espresso">All gifting</Link>
          </div>
          <div className="grid gap-12 lg:grid-cols-12">
            <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
              {gifts.map((p) => <li key={p.slug}><ProductCard product={p} ratio="1 / 1" /></li>)}
            </ul>
            <div className="flex flex-col justify-end gap-4 border-t border-rule pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <h3 className="text-3xl">Build Your Fauzey Box</h3>
              <p className="text-[0.97rem] text-muted">Choose 3, 5 or 8 items and fill your own box.</p>
              <ButtonLink href="/gifts/build-your-box/" variant="secondary">Start building</ButtonLink>
              <ButtonLink href="/gifts/corporate/" variant="ghost" className="justify-start !px-0">Corporate gifting enquiry</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="story-title" className="section-y page-x">
        <figure className="mx-auto max-w-4xl text-center">
          <blockquote>
            <p id="story-title" className="font-serif text-espresso" style={{ fontSize: 'clamp(2.6rem, 7vw, 6rem)', lineHeight: 1, fontWeight: 500 }}>
              “The craft of the humble nut.”
            </p>
          </blockquote>
          <figcaption className="mt-8 text-[1.02rem] text-muted">From {SITE.location}</figcaption>
          <div className="mt-8"><ButtonLink href="/story/" variant="secondary">Read our story</ButtonLink></div>
        </figure>
      </section>

      <section aria-labelledby="journal-title" className="border-t border-rule">
        <div className="page-x section-y">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 id="journal-title" className="display-lg">The Journal</h2>
            <Link href="/journal/" className="link-underline font-semibold text-espresso">All articles</Link>
          </div>
          <ul className="grid gap-10 md:grid-cols-3">
            {[ARTICLES[0], ARTICLES[3], ARTICLES[2]].map((a) => <li key={a.slug}><JournalCard article={a} /></li>)}
          </ul>
        </div>
      </section>

      <section aria-labelledby="news-title" className="bg-espresso text-butter" data-tone="dark">
        <div className="page-x section-y grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="news-title" className="display-md !text-snow">A little Fauzey in your inbox.</h2>
            <p className="mt-4 max-w-md text-butter/90">Recipes, new products and news from the Fauzey table.</p>
          </div>
          <div className="lg:col-span-6"><NewsletterForm tone="dark" /></div>
        </div>
      </section>
    </>
  );
}
