import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/commerce/ProductCard';
import { ProductView } from '@/components/commerce/ProductView';
import { JsonLd } from '@/components/seo/JsonLd';
import { PRODUCTS, getProduct, getRelated, primaryStem } from '@/lib/data/catalogue';
import { getCategory } from '@/lib/data/categories';
import { resolveImage } from '@/lib/data/images';
import { SITE } from '@/lib/config/site';
import { pageMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/utils/assets';

export const dynamicParams = false;
export const generateStaticParams = () => PRODUCTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.name, description: `${p.description} ${p.variants.length > 1 ? `Available in ${p.variants.length} sizes.` : ''}`.trim(), path: `/products/${p.slug}/` });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = getRelated(product);
  const defaultVariant = product.variants.find((v) => v.id === product.defaultVariantId) ?? product.variants[0];
  const img = resolveImage(primaryStem(defaultVariant));
  const priced = product.variants.filter((v) => v.price !== null);

  // Structured data: only facts that are true. Offers are included only when prices are configured.
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: SITE.name },
    url: absoluteUrl(`/products/${product.slug}/`),
    ...(img ? { image: `${absoluteUrl('/')}${img.src.replace(/^\/[^/]+\//, '')}` } : {}),
    ...(priced.length ? { offers: priced.map((v) => ({ '@type': 'Offer', sku: v.sku, price: v.price, priceCurrency: 'GHS', url: absoluteUrl(`/products/${product.slug}/`) })) } : {}),
  };

  return (
    <div className="page-x pb-28 pt-8 md:pb-24 sm:pt-12">
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex flex-wrap gap-x-2">
          <li><Link href="/" className="hover:underline">Home</Link><span aria-hidden className="ml-2">/</span></li>
          <li><Link href="/shop/" className="hover:underline">Shop</Link><span aria-hidden className="ml-2">/</span></li>
          {category && <li><Link href={`/shop/${category.slug}/`} className="hover:underline">{category.name}</Link><span aria-hidden className="ml-2">/</span></li>}
          <li aria-current="page" className="text-espresso">{product.name}</li>
        </ol>
      </nav>

      <ProductView product={product} />

      <section aria-labelledby="related-title" className="mt-24 border-t border-rule pt-16">
        <h2 id="related-title" className="display-md mb-10">You may also like</h2>
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => <li key={p.slug}><ProductCard product={p} ratio="1 / 1" /></li>)}
        </ul>
      </section>
    </div>
  );
}
