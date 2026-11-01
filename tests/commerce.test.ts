import { describe, expect, it } from 'vitest';
import { bagReducer, summariseBag, type BagLine } from '@/lib/commerce/bag';
import { formatMoney } from '@/lib/commerce/format';
import { canTransition } from '@/lib/commerce/order-state';
import { recommend } from '@/lib/commerce/recommend';
import { searchProducts, sortProducts } from '@/lib/commerce/search';
import { PRODUCTS, getVariantWithProduct, getProduct } from '@/lib/data/catalogue';
import { MANIFEST_FILENAMES, parseStem } from '@/lib/data/image-manifest';
import { getPaymentService, paymentMethodOptions } from '@/lib/payments';
import { isGhanaPhone, validateContact, validateDelivery, validateEnquiry } from '@/lib/validation/forms';

describe('image manifest & catalogue', () => {
  it('parses every supplied filename, including look-alikes', () => {
    for (const stems of Object.values(MANIFEST_FILENAMES)) for (const s of stems) expect(parseStem(s), s).not.toBeNull();
    expect(parseStem('PBs_150g')?.code).toBe('PB');
    expect(parseStem('RSP_50g-')?.suffix).toBe('-');
    expect(parseStem('CP_1kg')?.grams).toBe(1000);
  });
  it('builds 8 products with sorted sizes and unique SKUs', () => {
    expect(PRODUCTS).toHaveLength(8);
    const skus = PRODUCTS.flatMap((p) => p.variants.map((v) => v.sku));
    expect(new Set(skus).size).toBe(skus.length);
    const pb = getProduct('peanut-butter')!;
    expect(pb.variants.map((v) => v.sizeLabel)).toEqual(['50g','100g','150g','200g','250g','350g','400g','500g','700g','750g','900g','1kg']);
    expect(pb.defaultVariantId).toBe('PB-250');
  });
  it('keeps look-alike photographs distinct as alternates', () => {
    const v = getVariantWithProduct('PB-150')!.variant;
    expect(v.images.map((i) => i.stem).sort()).toEqual(['PB_150g', 'PB_150g_', 'PBs_150g'].sort());
    expect(v.images.filter((i) => i.role === 'primary').map((i) => i.stem)).toEqual(['PB_150g']);
    expect(getVariantWithProduct('RSP-50')!.variant.images).toHaveLength(3);
  });
  it('never invents prices', () => {
    expect(PRODUCTS.every((p) => p.variants.every((v) => v.price === null))).toBe(true);
  });
  it('shows registration references only on the correct product', () => {
    expect(getProduct('peanut-butter')!.label.fdaReference).toBe('FDA/Vg 24-103');
    expect(getProduct('crunchy-peanuts')!.label.fdaReference).toBe('FDA/Vg 24-102');
    for (const slug of ['chilli-lime-peanut-mix','roasted-salted-peanuts','premium-peanut-flour','gourmet-peanut-brittle'])
      expect(getProduct(slug)!.label.fdaReference).toBeUndefined();
  });
});

describe('shopping bag', () => {
  const reduce = (lines: BagLine[], ...a: Parameters<typeof bagReducer>[1][]) => a.reduce(bagReducer, lines);
  it('adds, merges, sets and removes', () => {
    let l = reduce([], { type: 'add', variantId: 'PB-250' }, { type: 'add', variantId: 'PB-250', quantity: 2 });
    expect(l).toEqual([{ variantId: 'PB-250', quantity: 3 }]);
    l = reduce(l, { type: 'setQuantity', variantId: 'PB-250', quantity: 5 });
    expect(l[0].quantity).toBe(5);
    l = reduce(l, { type: 'setQuantity', variantId: 'PB-250', quantity: 0 });
    expect(l).toEqual([]);
  });
  it('clamps quantity', () => {
    expect(reduce([], { type: 'add', variantId: 'PB-250', quantity: 500 })[0].quantity).toBe(99);
  });
  it('changes size and merges into an existing line', () => {
    const l = reduce([{ variantId: 'PB-250', quantity: 2 }, { variantId: 'PB-500', quantity: 1 }], { type: 'changeVariant', from: 'PB-250', to: 'PB-500' });
    expect(l).toEqual([{ variantId: 'PB-500', quantity: 3 }]);
    const m = reduce([{ variantId: 'PB-250', quantity: 2 }], { type: 'changeVariant', from: 'PB-250', to: 'PB-400' });
    expect(m).toEqual([{ variantId: 'PB-400', quantity: 2 }]);
  });
  it('flags unpriced bags and drops stale ids', () => {
    const s = summariseBag([{ variantId: 'PB-250', quantity: 2 }, { variantId: 'NOPE-1', quantity: 1 }], getVariantWithProduct);
    expect(s.lines).toHaveLength(1);
    expect(s.itemCount).toBe(2);
    expect(s.fullyPriced).toBe(false);
    expect(s.unpricedCount).toBe(1);
  });
  it('calculates subtotals when priced (injected lookup)', () => {
    const hit = getVariantWithProduct('PB-250')!;
    const priced = (id: string) => (id === 'PB-250' ? { ...hit, variant: { ...hit.variant, price: 12.5 } } : undefined);
    const s = summariseBag([{ variantId: 'PB-250', quantity: 3 }], priced);
    expect(s.subtotal).toBe(37.5);
    expect(s.fullyPriced).toBe(true);
  });
});

describe('formatting, search, sort', () => {
  it('formats GHS', () => {
    expect(formatMoney(1234.5)).toBe('GHS 1,234.50');
  });
  it('searches names, sizes and categories (AND terms)', () => {
    expect(searchProducts(PRODUCTS, 'chilli').map((p) => p.code)).toEqual(['CLPM']);
    expect(searchProducts(PRODUCTS, 'peanut butter 500g').map((p) => p.code)).toContain('PB');
    expect(searchProducts(PRODUCTS, 'fauzeys butter').map((p) => p.code)).toContain('PB');
    expect(searchProducts(PRODUCTS, 'zzzz')).toEqual([]);
    expect(searchProducts(PRODUCTS, '')).toHaveLength(8);
  });
  it('sorts', () => {
    expect(sortProducts(PRODUCTS, 'name-asc')[0].name.localeCompare(sortProducts(PRODUCTS, 'name-asc')[1].name)).toBeLessThan(0);
    expect(sortProducts(PRODUCTS, 'featured')[0].code).toBe('PB');
  });
});

describe('atelier recommendations', () => {
  it('returns nothing with no preferences', () => {
    expect(recommend(PRODUCTS, { textures: [], flavours: [], uses: [] })).toEqual([]);
  });
  it('ranks by matched preferences and flags inferred uses', () => {
    const r = recommend(PRODUCTS, { textures: ['crunchy'], flavours: ['natural'], uses: ['baking'] });
    expect(r[0].product.code).toBe('CP');
    expect(r[0].score).toBe(3);
    expect(r[0].usesInferred).toBe(false);
    const flour = recommend(PRODUCTS, { textures: [], flavours: [], uses: ['baking'] }).find((x) => x.product.code === 'PPF')!;
    expect(flour.usesInferred).toBe(true);
  });
});

describe('validation', () => {
  it('validates Ghana phone numbers', () => {
    for (const ok of ['0241234567', '024 123 4567', '+233 24 123 4567', '233241234567']) expect(isGhanaPhone(ok), ok).toBe(true);
    for (const bad of ['12345', '+1 415 555 0100', '024123456']) expect(isGhanaPhone(bad), bad).toBe(false);
  });
  it('validates checkout fields', () => {
    expect(Object.keys(validateContact({ fullName: '', email: 'x', phone: '1' })).sort()).toEqual(['email', 'fullName', 'phone']);
    expect(validateContact({ fullName: 'Ama Mensah', email: 'ama@example.com', phone: '0241234567' })).toEqual({});
    expect(Object.keys(validateDelivery({ addressLine1: '', addressLine2: '', city: '', region: '', instructions: '' })).sort()).toEqual(['addressLine1', 'city', 'region']);
    expect(validateEnquiry({ name: 'A', email: 'bad', phone: '', message: 'short' })).toHaveProperty('message');
  });
});

describe('payments & orders', () => {
  it('never offers a selectable live payment method on the static site', () => {
    const enabled = paymentMethodOptions().filter((m) => m.enabled).map((m) => m.id);
    expect(enabled).toEqual(['demo-request']);
    expect(getPaymentService().isLive).toBe(false);
  });
  it('rejects live payment creation', async () => {
    const r = await getPaymentService('paystack').createPayment({ orderReference: 'x', amount: 1, currency: 'GHS', customerEmail: 'a@b.co', customerPhone: '0241234567', method: 'card' });
    expect(r.status).toBe('unavailable');
  });
  it('enforces order state transitions', () => {
    expect(canTransition('PENDING_PAYMENT', 'PAID')).toBe(true);
    expect(canTransition('PENDING_PAYMENT', 'DELIVERED')).toBe(false);
    expect(canTransition('CANCELLED', 'PAID')).toBe(false);
  });
});
