import Link from 'next/link';
import { PeanutMark } from '@/components/brand/PeanutMark';

export function Logo({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <Link href="/" aria-label="Fauzey Peanut, home" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <PeanutMark className={`h-5 w-10 transition-transform duration-700 ease-slow group-hover:-rotate-3 ${tone === 'light' ? 'text-butter' : 'text-espresso'}`} />
      <span className={`font-serif text-[1.65rem] font-semibold leading-none tracking-[0.2em] ${tone === 'light' ? 'text-snow' : 'text-espresso'}`}>
        FAUZEY
      </span>
    </Link>
  );
}
