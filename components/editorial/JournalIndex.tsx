'use client';
import { useState } from 'react';
import { JournalCard } from '@/components/editorial/JournalCard';
import { ARTICLES, ARTICLE_CATEGORIES } from '@/lib/data/journal';
import type { ArticleCategory } from '@/lib/domain/types';

export function JournalIndex() {
  const [cat, setCat] = useState<ArticleCategory | 'all'>('all');
  const list = cat === 'all' ? ARTICLES : ARTICLES.filter((a) => a.category === cat);
  const chip = (on: boolean) => `border px-4 py-2 text-sm transition-colors ${on ? 'border-espresso bg-espresso text-snow' : 'border-rule bg-snow hover:border-espresso'}`;
  return (
    <div>
      <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={cat === 'all'} className={chip(cat === 'all')} onClick={() => setCat('all')}>All</button>
        {ARTICLE_CATEGORIES.map((c) => <button key={c.id} type="button" aria-pressed={cat === c.id} className={chip(cat === c.id)} onClick={() => setCat(c.id)}>{c.label}</button>)}
      </div>
      <p role="status" aria-live="polite" className="mt-4 text-sm text-muted">{list.length} {list.length === 1 ? 'article' : 'articles'}</p>
      <ul className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {list.map((a, i) => <li key={a.slug} className={i === 0 && cat === 'all' ? 'md:col-span-2 lg:col-span-2' : ''}><JournalCard article={a} large={i === 0 && cat === 'all'} headingLevel={2} /></li>)}
      </ul>
    </div>
  );
}
