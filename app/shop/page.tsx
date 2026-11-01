import { Suspense } from 'react';
import { ShopCatalogue } from '@/components/commerce/ShopCatalogue';
import { CatalogueSkeleton } from '@/components/ui/Skeleton';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Shop', description: 'Shop Fauzey peanut butter, crunchy peanuts, chilli lime peanut mix, roasted salted peanuts, premium peanut flour, gourmet peanut brittle and gift collections.', path: '/shop/' });

export default function ShopPage() {
  return (
    <div className="page-x pb-24 pt-14 sm:pt-20">
      <header className="mb-12 max-w-3xl">
        <h1 className="display-lg">The collection</h1>
        <p className="lede mt-5">Every Fauzey product, in every size. Choose a size, and add it to your bag.</p>
      </header>
      <Suspense fallback={<CatalogueSkeleton />}><ShopCatalogue /></Suspense>
    </div>
  );
}
