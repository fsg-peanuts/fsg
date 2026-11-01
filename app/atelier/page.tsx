import { AtelierExplorer } from '@/components/atelier/AtelierExplorer';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Peanut Atelier', description: 'Find your Fauzey. Choose a texture, a flavour and how you like to eat, and see the Fauzey products that fit.', path: '/atelier/' });

export default function AtelierPage() {
  return (
    <div className="page-x pb-28 pt-14 sm:pt-20">
      <header className="mb-16 max-w-3xl">
        <h1 className="display-lg">The Peanut Atelier</h1>
        <p className="lede mt-5">Tell us how you like your peanuts. We will match you to the Fauzey products that fit.</p>
      </header>
      <AtelierExplorer />
    </div>
  );
}
