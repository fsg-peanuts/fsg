import { ButtonLink } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { pageMetadata } from '@/lib/seo';

export const metadata = { ...pageMetadata({ title: 'Page not found', description: 'This page could not be found.', path: '/404/' }), robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <div className="page-x section-y">
      <EmptyState title="We couldn’t find that page" action={<div className="flex flex-wrap justify-center gap-3"><ButtonLink href="/shop/">Shop the collection</ButtonLink><ButtonLink href="/" variant="secondary">Back to home</ButtonLink></div>}>
        The link may be out of date, or the page may have moved.
      </EmptyState>
    </div>
  );
}
