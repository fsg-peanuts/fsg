'use client';
import Link from 'next/link';
import { BagLines, SubtotalRow } from '@/components/commerce/BagLines';
import { useBag } from '@/components/providers/BagProvider';
import { buttonClass } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';

export function BagPage() {
  const { summary, hydrated, clear } = useBag();
  if (!hydrated) return <Skeleton className="h-72 w-full" />;
  if (summary.lines.length === 0) return <EmptyState title="Your bag is empty" action={<Link href="/shop/" className={buttonClass('primary')}>Shop the collection</Link>}>Choose a size and add something to your bag.</EmptyState>;
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7"><BagLines /><button type="button" onClick={clear} className="mt-4 text-sm underline underline-offset-4">Empty bag</button></div>
      <aside className="space-y-4 border border-rule bg-snow p-6 lg:col-span-5 lg:self-start" aria-label="Bag summary">
        <h2 className="text-3xl">Summary</h2>
        <SubtotalRow />
        <p className="text-sm text-muted">Delivery fee and final total are confirmed with you. Checkout creates an order request, not a payment.</p>
        <Link href="/checkout/" className={buttonClass('primary', 'lg', 'w-full')}>Go to checkout</Link>
        <Link href="/shop/" className="block text-center text-sm underline underline-offset-4">Continue shopping</Link>
      </aside>
    </div>
  );
}
