import { groupManifest, sizeLabel } from '@/lib/data/image-manifest';
import { PRICES_GHS } from '@/lib/data/prices';
import { PRODUCT_SEEDS } from '@/lib/data/products';
import type { Product, ProductImageRef, ProductVariant } from '@/lib/domain/types';

function build(): Product[] {
  const grouped = groupManifest();

  return PRODUCT_SEEDS.map((seed) => {
    const bySize = grouped[seed.code] ?? {};
    const grams = Object.keys(bySize).map(Number).sort((a, b) => a - b);

    const variants: ProductVariant[] = grams.map((g) => {
      const label = sizeLabel(g);
      const sku = `FZY-${seed.code}-${label.toUpperCase()}`;
      const stems = [...bySize[g]].sort((a, b) => a.suffix.length - b.suffix.length || a.stem.localeCompare(b.stem));
      const images: ProductImageRef[] = stems.map((s, i) => ({
        stem: s.stem,
        role: i === 0 && s.suffix === '' && s.prefix === s.code ? 'primary' : 'alternate',
        note:
          s.prefix !== s.code
            ? `Alternate photograph (file prefix "${s.prefix}").`
            : s.suffix
              ? `Alternate photograph (file suffix "${s.suffix}").`
              : undefined,
      }));
      const price = PRICES_GHS[sku];
      return {
        id: `${seed.code}-${g}`,
        sku,
        productSlug: seed.slug,
        sizeLabel: label,
        grams: g,
        price: typeof price === 'number' && price > 0 ? price : null,
        images,
        active: true,
      };
    });

    const preferred = variants.find((v) => v.grams === 250) ?? variants[0];
    return {
      id: seed.code.toLowerCase(),
      slug: seed.slug,
      code: seed.code,
      name: seed.name,
      category: seed.category,
      tagline: seed.tagline,
      description: seed.description,
      highlights: seed.highlights,
      variants,
      defaultVariantId: preferred.id,
      label: seed.label,
      atelier: seed.atelier,
    };
  });
}

export const PRODUCTS: Product[] = build();

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

const VARIANT_INDEX = new Map(
  PRODUCTS.flatMap((p) => p.variants.map((v) => [v.id, { product: p, variant: v }] as const)),
);
export const getVariantWithProduct = (variantId: string) => VARIANT_INDEX.get(variantId);

export const productsInCategory = (categoryId: string) => PRODUCTS.filter((p) => p.category === categoryId);

export const hasAnyPrices = () => PRODUCTS.some((p) => p.variants.some((v) => v.price !== null));

export function priceRange(product: Product): { min: number; max: number } | null {
  const prices = product.variants.map((v) => v.price).filter((p): p is number => p !== null);
  return prices.length ? { min: Math.min(...prices), max: Math.max(...prices) } : null;
}

export function getRelated(product: Product, count = 3): Product[] {
  const same = PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category);
  const others = PRODUCTS.filter((p) => p.slug !== product.slug && p.category !== product.category && p.category !== 'gifts');
  return [...same, ...others].slice(0, count);
}

export const primaryStem = (variant: ProductVariant) =>
  (variant.images.find((i) => i.role === 'primary') ?? variant.images[0])?.stem;
