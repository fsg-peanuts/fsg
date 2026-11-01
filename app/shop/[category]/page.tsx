import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ShopCatalogue } from '@/components/commerce/ShopCatalogue';
import { CatalogueSkeleton } from '@/components/ui/Skeleton';
import { CATEGORIES, getCategoryBySlug } from '@/lib/data/categories';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => CATEGORIES.map((c) => ({ category: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const c = getCategoryBySlug((await params).category);
  if (!c) return {};
  return pageMetadata({ title: c.name, description: `${c.summary} Shop Fauzey ${c.name.toLowerCase()} in every available size.`, path: `/shop/${c.slug}/` });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const c = getCategoryBySlug((await params).category);
  if (!c) notFound();
  return (
    <div className="page-x pb-24 pt-14 sm:pt-20">
      <header className="mb-12 max-w-3xl">
        <h1 className="display-lg">{c.name}</h1>
        <p className="lede mt-5">{c.summary}</p>
      </header>
      <Suspense fallback={<CatalogueSkeleton />}><ShopCatalogue categoryId={c.id} /></Suspense>
    </div>
  );
}
