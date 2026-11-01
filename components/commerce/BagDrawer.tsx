'use client';
import Link from 'next/link';
import { BagLines, SubtotalRow } from '@/components/commerce/BagLines';
import { useBag } from '@/components/providers/BagProvider';
import { buttonClass } from '@/components/ui/Button';
import { Drawer } from '@/components/ui/Drawer';

export function BagDrawer() {
  const { drawerOpen, closeBag, summary } = useBag();
  return (
    <Drawer open={drawerOpen} onClose={closeBag} side="right" label="Shopping bag">
      <div className="flex h-full flex-col">
        <div className="border-b border-rule px-6 pb-4 pt-6">
          <h2 className="text-3xl">Your Fauzey bag</h2>
          <p className="mt-1 text-sm text-muted">{summary.itemCount === 0 ? 'Nothing here yet.' : `${summary.itemCount} ${summary.itemCount === 1 ? 'item' : 'items'}`}</p>
        </div>
        <div className="flex-1 overflow-y-auto px-6">
          {summary.lines.length === 0 ? (
            <div className="py-16 text-center">
              <p className="mb-6 font-serif text-2xl text-espresso">Your bag is empty.</p>
              <Link href="/shop/" onClick={closeBag} className={buttonClass('primary')}>Shop the collection</Link>
            </div>
          ) : <BagLines onNavigate={closeBag} />}
        </div>
        {summary.lines.length > 0 && (
          <div className="space-y-4 border-t border-rule bg-snow px-6 py-5">
            <SubtotalRow />
            <p className="text-xs text-muted">Delivery is confirmed with you after you send your order request.</p>
            <Link href="/checkout/" onClick={closeBag} className={buttonClass('primary', 'lg', 'w-full')}>Go to checkout</Link>
            <Link href="/bag/" onClick={closeBag} className="block text-center text-sm underline underline-offset-4">View full bag</Link>
          </div>
        )}
      </div>
    </Drawer>
  );
}
