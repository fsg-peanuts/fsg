import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'light' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex min-h-[3rem] items-center justify-center gap-2 border px-6 text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50';
const variants: Record<Variant, string> = {
  primary: 'border-espresso bg-espresso text-snow hover:bg-chestnut hover:border-chestnut',
  secondary: 'border-espresso bg-transparent text-espresso hover:bg-espresso hover:text-snow',
  light: 'border-butter bg-butter text-espresso hover:bg-snow hover:border-snow',
  ghost: 'border-transparent bg-transparent text-espresso hover:bg-butter/60',
};
const sizes: Record<Size, string> = { md: '', lg: 'min-h-[3.5rem] px-8' };

export const buttonClass = (variant: Variant = 'primary', size: Size = 'md', extra = '') => `${base} ${variants[variant]} ${sizes[size]} ${extra}`;

interface Common { variant?: Variant; size?: Size; className?: string; children: ReactNode }

export function Button({ variant, size, className, children, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={buttonClass(variant, size, className)} {...rest}>{children}</button>;
}

export function ButtonLink({ href, variant, size, className, children, external }: Common & { href: string; external?: boolean }) {
  const cls = buttonClass(variant, size, className);
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}
