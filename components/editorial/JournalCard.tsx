import Link from 'next/link';
import { ProductImage } from '@/components/commerce/ProductImage';
import { categoryLabel } from '@/lib/data/journal';
import type { Article } from '@/lib/domain/types';

export function JournalCard({ article, large = false, headingLevel = 3 }: { article: Article; large?: boolean; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <article className="group">
      <Link href={`/journal/${article.slug}/`} className="block" tabIndex={-1} aria-hidden="true">
        <ProductImage stem={article.imageStem} alt="" name="Fauzey Journal" ratio={large ? '4 / 3' : '5 / 4'} className="border border-rule" />
      </Link>
      <p className="mt-4 text-sm text-chestnut">{categoryLabel(article.category)}<span className="mx-2 text-rule" aria-hidden>|</span>{article.readMinutes} min read</p>
      <Heading className={`mt-1 font-serif leading-tight ${large ? 'text-4xl' : 'text-[1.7rem]'}`}>
        <Link href={`/journal/${article.slug}/`} className="link-underline">{article.title}</Link>
      </Heading>
      <p className="mt-2 max-w-md text-[0.97rem] text-muted">{article.excerpt}</p>
    </article>
  );
}
