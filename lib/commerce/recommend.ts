import type { FlavourId, Product, TextureId, UseId } from '@/lib/domain/types';

export interface AtelierPreferences {
  textures: TextureId[];
  flavours: FlavourId[];
  uses: UseId[];
}

export interface Recommendation {
  product: Product;
  score: number;
  /** Human-readable reasons, each traceable to product data. */
  reasons: string[];
  /** True if any matched use came from product type rather than Fauzey's supplied directions. */
  usesInferred: boolean;
}

export const TEXTURE_LABELS: Record<TextureId, string> = { crunchy: 'Crunchy', smooth: 'Smooth and ground', roasted: 'Roasted' };
export const FLAVOUR_LABELS: Record<FlavourId, string> = { natural: 'Natural groundnut', salted: 'Salted', 'chilli-lime': 'Chilli and lime' };
export const USE_LABELS: Record<UseId, string> = { snacking: 'Snacking', spreading: 'Spreading', cooking: 'Cooking', baking: 'Baking' };

export const hasPreferences = (p: AtelierPreferences) => p.textures.length + p.flavours.length + p.uses.length > 0;

/** Pure, deterministic scoring: one point per matched preference. Ties keep catalogue order. */
export function recommend(products: Product[], prefs: AtelierPreferences): Recommendation[] {
  if (!hasPreferences(prefs)) return [];
  const scored: { rec: Recommendation; index: number }[] = [];
  products.forEach((product, index) => {
    const reasons: string[] = [];
    let score = 0;
    let usesInferred = false;
    for (const t of prefs.textures) if (product.atelier.textures.includes(t)) { score++; reasons.push(TEXTURE_LABELS[t]); }
    for (const f of prefs.flavours) if (product.atelier.flavours.includes(f)) { score++; reasons.push(FLAVOUR_LABELS[f]); }
    for (const u of prefs.uses) {
      if (product.atelier.uses.includes(u)) {
        score++;
        reasons.push(USE_LABELS[u]);
        if (product.atelier.usesBasis === 'product-type') usesInferred = true;
      }
    }
    if (score > 0) scored.push({ rec: { product, score, reasons, usesInferred }, index });
  });
  return scored.sort((a, b) => b.rec.score - a.rec.score || a.index - b.index).map((s) => s.rec);
}
