/**
 * Domain model (see Blueprint §11–§22). Plain types only: no UI, no vendor SDKs.
 * Only Product / Variant / Category / Article are used by the static storefront today.
 * The rest document the contract a future backend must implement.
 */

export type CategoryId =
  | 'peanut-butter'
  | 'crunchy-peanuts'
  | 'chilli-lime-mix'
  | 'roasted-salted-peanuts'
  | 'peanut-flour'
  | 'peanut-brittle'
  | 'gifts';

export interface Category {
  id: CategoryId;
  slug: string;
  name: string;
  summary: string;
  /** Image-filename prefix that identifies this category's photography. */
  imageCode: string;
}

export type ImageRole = 'primary' | 'alternate';

export interface ProductImageRef {
  /** Exact original filename stem, e.g. "PB_500g_" (extension excluded). */
  stem: string;
  role: ImageRole;
  note?: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  productSlug: string;
  sizeLabel: string;
  grams: number;
  /** GHS price. `null` = awaiting configuration (see lib/data/prices.ts). */
  price: number | null;
  images: ProductImageRef[];
  active: boolean;
}

export type TextureId = 'crunchy' | 'smooth' | 'roasted';
export type FlavourId = 'natural' | 'salted' | 'chilli-lime';
export type UseId = 'snacking' | 'spreading' | 'cooking' | 'baking';

export interface AtelierTags {
  textures: TextureId[];
  flavours: FlavourId[];
  uses: UseId[];
  /** "supplied" = from Fauzey's directions for use; "product-type" = implied by what the product is. */
  usesBasis: 'supplied' | 'product-type';
}

/** Dynamic fields for the reusable product label component. Everything is optional: never fabricated. */
export interface LabelInfo {
  ingredients?: string;
  manufacturer?: string;
  location?: string;
  registration?: string;
  fdaReference?: string;
  storage?: string;
  directions?: string[];
  brandHandle?: string;
  email?: string;
  bulkPhone?: string;
}

export interface Product {
  id: string;
  slug: string;
  code: string;
  name: string;
  category: CategoryId;
  tagline: string;
  description: string;
  highlights: string[];
  variants: ProductVariant[];
  defaultVariantId: string;
  label: LabelInfo;
  atelier: AtelierTags;
}

/* ---------- Future backend contracts (documentation-grade types) ---------- */

export interface InventoryRecord {
  sku: string;
  batch?: string;
  onHand: number;
  reserved: number;
  reorderLevel?: number;
  productionDate?: string;
  expiryDate?: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  marketingConsent: boolean;
}

export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'PROCESSING'
  | 'PACKED'
  | 'DISPATCHED'
  | 'DELIVERED'
  | 'PAYMENT_FAILED'
  | 'CANCELLED'
  | 'REFUNDED'
  | 'RETURNED';

export interface OrderItemSnapshot {
  sku: string;
  productName: string;
  sizeLabel: string;
  quantity: number;
  /** Price captured at purchase time; null when the request was made before pricing existed. */
  unitPrice: number | null;
}

export interface Promotion {
  id: string;
  code: string;
  description: string;
  active: boolean;
}

export interface GiftBoxSelection {
  size: 3 | 5 | 8;
  variantIds: string[];
}

export type ArticleCategory =
  | 'recipes'
  | 'peanut-education'
  | 'product-guides'
  | 'brand-stories'
  | 'food-inspiration';

export interface ArticleBlock {
  type: 'p' | 'h2' | 'ul' | 'ol';
  text?: string;
  items?: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  readMinutes: number;
  blocks: ArticleBlock[];
  /** Optional product photography stem used as the article's visual. */
  imageStem?: string;
  relatedProductSlugs?: string[];
}
