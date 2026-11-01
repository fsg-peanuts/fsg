import { BoxBuilder } from '@/components/gifts/BoxBuilder';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Build Your Fauzey Box', description: 'Choose a box of 3, 5 or 8 items and fill it with your favourite Fauzey products.', path: '/gifts/build-your-box/' });

export default function BuildYourBoxPage() {
  return (
    <div className="page-x pb-28 pt-14 sm:pt-20">
      <header className="mb-14 max-w-3xl">
        <h1 className="display-lg">Build Your Fauzey Box</h1>
        <p className="lede mt-5">Choose a box size, fill every space, and add it to your bag.</p>
      </header>
      <BoxBuilder />
    </div>
  );
}
