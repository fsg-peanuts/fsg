export type Errors<T extends string> = Partial<Record<T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isEmail = (v: string) => EMAIL_RE.test(v.trim());

/** Ghana numbers: 0XXXXXXXXX, 233XXXXXXXXX or +233XXXXXXXXX (9 digits after the prefix). */
export function isGhanaPhone(v: string): boolean {
  const compact = v.replace(/[\s()-]/g, '');
  return /^(?:\+233|233|0)\d{9}$/.test(compact);
}

export function normaliseGhanaPhone(v: string): string {
  const compact = v.replace(/[\s()-]/g, '');
  if (/^0\d{9}$/.test(compact)) return `+233${compact.slice(1)}`;
  if (/^233\d{9}$/.test(compact)) return `+${compact}`;
  return compact;
}

export const GHANA_REGIONS = [
  'Greater Accra', 'Ashanti', 'Western', 'Western North', 'Central', 'Eastern', 'Volta', 'Oti',
  'Northern', 'Savannah', 'North East', 'Upper East', 'Upper West', 'Bono', 'Bono East', 'Ahafo',
] as const;

/* ---------- Checkout ---------- */
export interface ContactDetails { fullName: string; email: string; phone: string }
export interface DeliveryDetails { addressLine1: string; addressLine2: string; city: string; region: string; instructions: string }

export function validateContact(v: ContactDetails): Errors<keyof ContactDetails> {
  const e: Errors<keyof ContactDetails> = {};
  if (v.fullName.trim().length < 2) e.fullName = 'Enter your full name.';
  if (!isEmail(v.email)) e.email = 'Enter a valid email address, like name@example.com.';
  if (!isGhanaPhone(v.phone)) e.phone = 'Enter a Ghana phone number, like 024 123 4567 or +233 24 123 4567.';
  return e;
}

export function validateDelivery(v: DeliveryDetails): Errors<keyof DeliveryDetails> {
  const e: Errors<keyof DeliveryDetails> = {};
  if (v.addressLine1.trim().length < 3) e.addressLine1 = 'Enter the street, house or landmark for delivery.';
  if (v.city.trim().length < 2) e.city = 'Enter your town or city.';
  if (!(GHANA_REGIONS as readonly string[]).includes(v.region)) e.region = 'Choose your region.';
  if (v.instructions.length > 500) e.instructions = 'Keep delivery instructions under 500 characters.';
  return e;
}

/* ---------- Enquiries ---------- */
export interface EnquiryDetails { name: string; email: string; phone: string; message: string; organisation?: string }

export function validateEnquiry(v: EnquiryDetails, requireOrganisation = false): Errors<keyof EnquiryDetails> {
  const e: Errors<keyof EnquiryDetails> = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name.';
  if (!isEmail(v.email)) e.email = 'Enter a valid email address, like name@example.com.';
  if (v.phone.trim() && !isGhanaPhone(v.phone)) e.phone = 'Enter a Ghana phone number, or leave this blank.';
  if (requireOrganisation && (v.organisation ?? '').trim().length < 2) e.organisation = 'Enter your organisation name.';
  if (v.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).';
  return e;
}

export const hasErrors = (e: object) => Object.keys(e).length > 0;
