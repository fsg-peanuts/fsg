import { JournalIndex } from '@/components/editorial/JournalIndex';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Journal', description: 'Recipes, peanut education, product guides, brand stories and food inspiration from Fauzey Peanut.', path: '/journal/' });

export default function JournalPage() {
  return (
    <div className="page-x pb-28 pt-14 sm:pt-20">
      <header className="mb-12 max-w-3xl">
        <h1 className="display-lg">The Journal</h1>
        <p className="lede mt-5">Recipes, peanut education, product guides and stories from the Fauzey table.</p>
      </header>
      <JournalIndex />
    </div>
  );
}
