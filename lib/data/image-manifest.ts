/**
 * PRODUCT IMAGE MANIFEST
 *
 * Source: the supplied product-photography contact sheet. The filenames below are the
 * visible references on that sheet. Original filenames are preserved EXACTLY, including
 * look-alikes (trailing "_" or "-", and "PBs"), because they are distinct files.
 *
 * Prefix meaning:
 *   CLPM = Chilli Lime Peanut Mix       CP  = Crunchy Peanuts
 *   FCP  = Crunchy Peanuts collection   FPB = Peanut Butter collection
 *   GPB  = Gourmet Peanut Brittle       PB  = Peanut Butter
 *   PPF  = Premium Peanut Flour         RSP = Roasted Salted Peanuts
 *
 * NOTE: the meaning of the suffixes ("_", "-") and of "PBs" was not stated. They are treated
 * as ALTERNATE photographs of the same size until the Fauzey team confirms. Nothing here
 * claims what they depict.
 *
 * Expected on-disk location: public/images/products/  (any sub-folders; file extension free).
 * Whether a file really exists is detected at build time by `npm run scan:images`.
 */

const SIZES = ['1kg', '50g', '100g', '150g', '200g', '250g', '350g', '400g', '500g', '700g', '750g', '900g'];
const family = (prefix: string) => SIZES.map((s) => `${prefix}_${s}`);

export const MANIFEST_FILENAMES: Record<string, string[]> = {
  CLPM: family('CLPM'),
  CP: family('CP'),
  FCP: ['FCP_300g'],
  FPB: ['FPB_500g', 'FPB_500g_'],
  GPB: family('GPB'),
  PB: [
    ...family('PB'),
    'PB_50g_', 'PB_100g_', 'PB_150g_', 'PB_200g_', 'PB_250g_', 'PB_350g_', 'PB_400g_', 'PB_500g_',
    'PBs_150g',
  ],
  PPF: family('PPF'),
  RSP: [...family('RSP'), 'RSP_50g-', 'RSP_50g_'],
};

export interface ParsedStem {
  stem: string;
  prefix: string;
  /** Canonical product code (PBs -> PB). */
  code: string;
  grams: number;
  suffix: string;
}

const STEM_RE = /^([A-Za-z]+)_(\d+(?:\.\d+)?)(kg|g)(.*)$/;

export function parseStem(stem: string): ParsedStem | null {
  const m = STEM_RE.exec(stem);
  if (!m) return null;
  const [, prefix, num, unit, suffix] = m;
  const grams = unit === 'kg' ? Math.round(parseFloat(num) * 1000) : Math.round(parseFloat(num));
  const code = prefix === 'PBs' ? 'PB' : prefix;
  return { stem, prefix, code, grams, suffix };
}

export function sizeLabel(grams: number): string {
  return grams >= 1000 && grams % 1000 === 0 ? `${grams / 1000}kg` : `${grams}g`;
}

/** Every parsed manifest entry, grouped by product code then by grams. */
export function groupManifest(): Record<string, Record<number, ParsedStem[]>> {
  const out: Record<string, Record<number, ParsedStem[]>> = {};
  for (const stems of Object.values(MANIFEST_FILENAMES)) {
    for (const stem of stems) {
      const p = parseStem(stem);
      if (!p) continue;
      ((out[p.code] ??= {})[p.grams] ??= []).push(p);
    }
  }
  return out;
}
