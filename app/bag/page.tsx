import { BagPage } from '@/components/commerce/BagPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = { ...pageMetadata({ title: 'Your bag', description: 'Review the items in your Fauzey bag.', path: '/bag/' }), robots: { index: false, follow: true } };

export default function Page() {
  return (
    <div className="page-x pb-28 pt-14 sm:pt-20">
      <h1 className="display-lg mb-10">Your Fauzey bag</h1>
      <BagPage />
    </div>
  );
}
