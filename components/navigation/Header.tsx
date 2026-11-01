'use client';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { SearchDialog } from '@/components/navigation/SearchDialog';
import { useBag } from '@/components/providers/BagProvider';
import { Drawer } from '@/components/ui/Drawer';
import { NAV_ITEMS, SITE } from '@/lib/config/site';

export function Header() {
  const pathname = usePathname();
  const { summary, hydrated, openBag } = useBag();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  const ref = useRef<HTMLElement>(null);

  // Quiet on scroll: slides away when reading downward, returns on scroll up or keyboard focus.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > last.current + 4);
      if (y < last.current - 4 || y <= 240) setHidden(false);
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const count = hydrated ? summary.itemCount : 0;
  const iconBtn = 'relative grid h-11 w-11 place-items-center text-snow transition-colors hover:bg-chestnut';
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname?.startsWith(href));

  return (
    <>
      <header ref={ref} onFocusCapture={() => setHidden(false)} data-tone="dark"
        className={`sticky top-0 z-50 bg-espresso text-snow transition-transform duration-500 ease-slow ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="page-x grid h-[4.25rem] grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center">
            <button type="button" className={`${iconBtn} -ml-3 lg:hidden`} aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu aria-hidden className="h-5 w-5" /></button>
            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
              {NAV_ITEMS.map((n) => (
                <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? 'page' : undefined} className="link-underline text-[0.8rem] font-medium uppercase tracking-[0.16em] text-snow">{n.label}</Link>
              ))}
            </nav>
          </div>
          <Logo />
          <div className="flex items-center justify-end gap-1">
            <Link href="/contact/" className="link-underline mr-4 hidden text-[0.8rem] font-medium uppercase tracking-[0.16em] text-snow xl:inline-block">Contact</Link>
            <button type="button" className={iconBtn} aria-label="Search" onClick={() => setSearchOpen(true)}><Search aria-hidden className="h-5 w-5" /></button>
            <button type="button" className={`${iconBtn} -mr-2 sm:mr-0`} aria-label={`Open bag, ${count} ${count === 1 ? 'item' : 'items'}`} onClick={openBag}>
              <ShoppingBag aria-hidden className="h-5 w-5" />
              {count > 0 && <span aria-hidden className="absolute right-0.5 top-1 grid h-5 min-w-5 place-items-center bg-butter px-1 text-[0.68rem] font-bold text-espresso">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} side="left" label="Menu">
        <div className="flex h-full flex-col px-7 pb-8 pt-20">
          <nav aria-label="Mobile primary">
            <ul className="space-y-1">
              {[...NAV_ITEMS, { label: 'Contact', href: '/contact/' }].map((n) => (
                <li key={n.href}><Link href={n.href} onClick={() => setMenuOpen(false)} aria-current={isActive(n.href) ? 'page' : undefined} className="block py-2 font-serif text-4xl text-espresso hover:text-chestnut">{n.label}</Link></li>
              ))}
            </ul>
          </nav>
          <button type="button" onClick={() => { setMenuOpen(false); setSearchOpen(true); }} className="mt-8 flex items-center gap-3 border border-rule bg-snow px-4 py-3 text-left text-muted"><Search aria-hidden className="h-4 w-4" />Search products</button>
          <div className="mt-auto border-t border-rule pt-6 text-sm text-muted">
            <p>{SITE.location}</p>
            <p className="mt-1"><a className="underline underline-offset-4" href={`tel:${SITE.bulkPhone}`}>{SITE.bulkPhoneDisplay}</a> for bulk purchases</p>
          </div>
        </div>
      </Drawer>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
