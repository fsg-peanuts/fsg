import type { ReactNode } from 'react';
import { PeanutMark } from '@/components/brand/PeanutMark';

export function EmptyState({ title, children, action, level = 2 }: { title: string; children?: ReactNode; action?: ReactNode; level?: 1 | 2 }) {
  const Heading = level === 1 ? 'h1' : 'h2';
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <PeanutMark className="mb-6 h-8 w-16 text-amber" />
      <Heading className="mb-3 text-3xl">{title}</Heading>
      {children && <p className="mb-8 text-muted">{children}</p>}
      {action}
    </div>
  );
}
