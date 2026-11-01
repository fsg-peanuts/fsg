import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/commerce/ProductCard';
import { ProductImage } from '@/components/commerce/ProductImage';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE } from '@/lib/config/site';
import { getProduct } from '@/lib/data/catalogue';
import { ARTICLES, categoryLabel, getArticle } from '@/lib/data/journal';
import { pageMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/utils/assets';

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  return a ? pageMetadata({ title: a.title, description: a.excerpt, path: `/journal/${a.slug}/` }) : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const related = (a.relatedProductSlugs ?? []).map((s) => getProduct(s)).filter((p): p is NonNullable<typeof p> => !!p).slice(0, 3);

  return (
    <article className="pb-24">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.excerpt, author: { '@type': 'Organization', name: SITE.name }, publisher: { '@type': 'Organization', name: SITE.name }, mainEntityOfPage: absoluteUrl(`/journal/${a.slug}/`) }} />
      <header className="bg-butter">
        <div className="page-x py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm"><Link href="/journal/" className="underline underline-offset-4">Journal</Link></nav>
          <p className="text-sm text-chestnut">{categoryLabel(a.category)}<span className="mx-2" aria-hidden>|</span>{a.readMinutes} min read</p>
          <h1 className="display-lg mt-3 max-w-4xl">{a.title}</h1>
          <p className="lede mt-5 max-w-2xl">{a.excerpt}</p>
        </div>
      </header>
      <div className="page-x grid gap-12 pt-14 lg:grid-cols-12">
        <div className="prose-fz lg:col-span-7 lg:col-start-2">
          {a.blocks.map((b, i) =>
            b.type === 'h2' ? <h2 key={i}>{b.text}</h2>
            : b.type === 'p' ? <p key={i}>{b.text}</p>
            : b.type === 'ul' ? <ul key={i}>{b.items?.map((it) => <li key={it}>{it}</li>)}</ul>
            : <ol key={i}>{b.items?.map((it) => <li key={it}>{it}</li>)}</ol>)}
        </div>
        {a.imageStem && <div className="lg:col-span-3"><ProductImage stem={a.imageStem} alt="" name="Fauzey" ratio="4 / 5" className="border border-rule" /></div>}
      </div>
      {related.length > 0 && (
        <section aria-labelledby="rel" className="page-x mt-20 border-t border-rule pt-14">
          <h2 id="rel" className="display-md mb-10">From this story</h2>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{related.map((p) => <li key={p.slug}><ProductCard product={p} ratio="1 / 1" /></li>)}</ul>
        </section>
      )}
    </article>
  );
}
