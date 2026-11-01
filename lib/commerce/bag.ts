import { MAX_LINE_QUANTITY } from '@/lib/config/commerce';
import type { Product, ProductVariant } from '@/lib/domain/types';

export interface BagLine {
  variantId: string;
  quantity: number;
}

export type BagAction =
  | { type: 'hydrate'; lines: BagLine[] }
  | { type: 'add'; variantId: string; quantity?: number }
  | { type: 'remove'; variantId: string }
  | { type: 'setQuantity'; variantId: string; quantity: number }
  | { type: 'changeVariant'; from: string; to: string }
  | { type: 'clear' };

const clamp = (n: number) => Math.max(0, Math.min(MAX_LINE_QUANTITY, Math.floor(n)));

export function bagReducer(lines: BagLine[], action: BagAction): BagLine[] {
  switch (action.type) {
    case 'hydrate':
      return action.lines.filter((l) => l.quantity > 0).map((l) => ({ ...l, quantity: clamp(l.quantity) }));
    case 'add': {
      const qty = clamp(action.quantity ?? 1);
      if (qty === 0) return lines;
      const existing = lines.find((l) => l.variantId === action.variantId);
      if (existing) {
        return lines.map((l) => (l.variantId === action.variantId ? { ...l, quantity: clamp(l.quantity + qty) } : l));
      }
      return [...lines, { variantId: action.variantId, quantity: qty }];
    }
    case 'remove':
      return lines.filter((l) => l.variantId !== action.variantId);
    case 'setQuantity': {
      const qty = clamp(action.quantity);
      if (qty === 0) return lines.filter((l) => l.variantId !== action.variantId);
      return lines.map((l) => (l.variantId === action.variantId ? { ...l, quantity: qty } : l));
    }
    case 'changeVariant': {
      if (action.from === action.to) return lines;
      const source = lines.find((l) => l.variantId === action.from);
      if (!source) return lines;
      const without = lines.filter((l) => l.variantId !== action.from);
      const target = without.find((l) => l.variantId === action.to);
      if (target) {
        return without.map((l) => (l.variantId === action.to ? { ...l, quantity: clamp(l.quantity + source.quantity) } : l));
      }
      // keep the line in its original position
      return lines.map((l) => (l.variantId === action.from ? { ...l, variantId: action.to } : l));
    }
    case 'clear':
      return [];
    default:
      return lines;
  }
}

export interface ResolvedLine {
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
  unitPrice: number | null;
  lineTotal: number | null;
}

export interface BagSummary {
  lines: ResolvedLine[];
  itemCount: number;
  /** Sum of priced lines only. */
  subtotal: number;
  unpricedCount: number;
  /** True only when the bag has lines and every one of them has a configured price. */
  fullyPriced: boolean;
}

export type VariantLookup = (variantId: string) => { product: Product; variant: ProductVariant } | undefined;

export function summariseBag(lines: BagLine[], lookup: VariantLookup): BagSummary {
  const resolved: ResolvedLine[] = [];
  for (const l of lines) {
    const hit = lookup(l.variantId);
    if (!hit || l.quantity <= 0) continue; // silently drop stale ids from old persisted bags
    const unitPrice = hit.variant.price;
    resolved.push({
      variantId: l.variantId,
      quantity: l.quantity,
      product: hit.product,
      variant: hit.variant,
      unitPrice,
      lineTotal: unitPrice === null ? null : Math.round(unitPrice * l.quantity * 100) / 100,
    });
  }
  const subtotal = Math.round(resolved.reduce((s, l) => s + (l.lineTotal ?? 0), 0) * 100) / 100;
  const unpricedCount = resolved.filter((l) => l.unitPrice === null).length;
  return {
    lines: resolved,
    itemCount: resolved.reduce((s, l) => s + l.quantity, 0),
    subtotal,
    unpricedCount,
    fullyPriced: resolved.length > 0 && unpricedCount === 0,
  };
}
