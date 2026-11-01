import { SITE } from '@/lib/config/site';
import type { AtelierTags, CategoryId, LabelInfo } from '@/lib/domain/types';

/**
 * Product definitions. Copy here is limited to what Fauzey supplied or what follows directly
 * from a product's name. No nutrition, taste, origin or process claims. Do not add any without
 * confirmation from the Fauzey team.
 *
 * ASSUMPTIONS to confirm with Fauzey (also listed in docs/PRODUCT_DATA.md):
 *  1. Peanut Butter is tagged "smooth" in the Atelier (the brief lists "smoothness" as an axis).
 *  2. "usesBasis: 'product-type'" means use cases are implied by what the product is, not
 *     supplied directions for use. The Atelier labels these honestly.
 */
export interface ProductSeed {
  code: string;
  slug: string;
  name: string;
  category: CategoryId;
  tagline: string;
  description: string;
  highlights: string[];
  label: LabelInfo;
  atelier: AtelierTags;
}

const MAKER: Pick<LabelInfo, 'manufacturer' | 'location' | 'registration' | 'storage' | 'brandHandle' | 'email' | 'bulkPhone' | 'ingredients'> = {
  ingredients: 'Groundnut',
  manufacturer: SITE.manufacturer,
  location: SITE.location,
  registration: 'AF-0458-8809',
  storage: 'Store in a cool, dry place.',
  brandHandle: SITE.handle,
  email: SITE.email,
  bulkPhone: SITE.bulkPhone,
};

export const PRODUCT_SEEDS: ProductSeed[] = [
  {
    code: 'PB',
    slug: 'peanut-butter',
    name: "Fauzey's Peanut Butter",
    category: 'peanut-butter',
    tagline: 'One ingredient. Groundnut.',
    description:
      'Peanut butter made from a single ingredient: groundnut. Spoon it onto toast, blend it into a smoothie, or fold it into your cooking and baking.',
    highlights: ['Ingredient: groundnut', 'Spread, snack, cook, bake or blend', 'Store in a cool, dry place'],
    label: {
      ...MAKER,
      fdaReference: 'FDA/Vg 24-103',
      directions: ['Snacking', 'Cooking', 'Spread for toast', 'Baking recipes', 'Smoothies'],
    },
    atelier: { textures: ['smooth'], flavours: ['natural'], uses: ['snacking', 'spreading', 'cooking', 'baking'], usesBasis: 'supplied' },
  },
  {
    code: 'CP',
    slug: 'crunchy-peanuts',
    name: "Fauzey's Crunchy Peanuts",
    category: 'crunchy-peanuts',
    tagline: 'Crunch, from groundnut alone.',
    description:
      'Crunchy peanuts with groundnut as the only ingredient. Eat them as a snack, cook with them, bake with them, or blend them into a smoothie.',
    highlights: ['Ingredient: groundnut', 'Snack, cook, bake or blend', 'Store in a cool, dry place'],
    label: {
      ...MAKER,
      fdaReference: 'FDA/Vg 24-102',
      directions: ['Snacking', 'Cooking', 'Baking recipes', 'Smoothies'],
    },
    atelier: { textures: ['crunchy'], flavours: ['natural'], uses: ['snacking', 'cooking', 'baking'], usesBasis: 'supplied' },
  },
  {
    code: 'CLPM',
    slug: 'chilli-lime-peanut-mix',
    name: 'Chilli Lime Peanut Mix',
    category: 'chilli-lime-mix',
    tagline: 'Chilli and lime, with peanuts.',
    description: 'A peanut mix with chilli and lime. The full ingredient list is printed on the pack.',
    highlights: ['Chilli and lime flavour', 'A snack for sharing'],
    label: {},
    atelier: { textures: [], flavours: ['chilli-lime'], uses: ['snacking'], usesBasis: 'product-type' },
  },
  {
    code: 'RSP',
    slug: 'roasted-salted-peanuts',
    name: 'Roasted Salted Peanuts',
    category: 'roasted-salted-peanuts',
    tagline: 'Roasted. Salted. Ready to share.',
    description: 'Roasted, salted peanuts for snacking. The full ingredient list is printed on the pack.',
    highlights: ['Roasted and salted', 'A snack for sharing'],
    label: {},
    atelier: { textures: ['roasted'], flavours: ['salted'], uses: ['snacking'], usesBasis: 'product-type' },
  },
  {
    code: 'PPF',
    slug: 'premium-peanut-flour',
    name: 'Premium Peanut Flour',
    category: 'peanut-flour',
    tagline: 'Peanut flour for the kitchen.',
    description: 'Premium peanut flour, made for the kitchen. The full ingredient list is printed on the pack.',
    highlights: ['For cooking and baking', 'Pantry staple'],
    label: {},
    atelier: { textures: [], flavours: [], uses: ['cooking', 'baking'], usesBasis: 'product-type' },
  },
  {
    code: 'GPB',
    slug: 'gourmet-peanut-brittle',
    name: 'Gourmet Peanut Brittle',
    category: 'peanut-brittle',
    tagline: 'A gourmet peanut brittle.',
    description: 'Gourmet peanut brittle from Fauzey. The full ingredient list is printed on the pack.',
    highlights: ['A treat to share', 'Gourmet peanut brittle'],
    label: {},
    atelier: { textures: [], flavours: [], uses: ['snacking'], usesBasis: 'product-type' },
  },
  {
    code: 'FCP',
    slug: 'crunchy-peanuts-collection',
    name: "Fauzey's Crunchy Peanuts Collection",
    category: 'gifts',
    tagline: 'A collection of crunchy peanuts.',
    description: "A Fauzey collection pack of Crunchy Peanuts. Ask us about the contents of this pack before you order.",
    highlights: ['Collection pack', 'Crunchy peanuts'],
    label: {},
    atelier: { textures: ['crunchy'], flavours: [], uses: ['snacking'], usesBasis: 'product-type' },
  },
  {
    code: 'FPB',
    slug: 'peanut-butter-collection',
    name: "Fauzey's Peanut Butter Collection",
    category: 'gifts',
    tagline: 'A collection of peanut butter.',
    description: "A Fauzey collection pack of Peanut Butter. Ask us about the contents of this pack before you order.",
    highlights: ['Collection pack', 'Peanut butter'],
    label: {},
    atelier: { textures: ['smooth'], flavours: [], uses: ['spreading'], usesBasis: 'product-type' },
  },
];
