/** Single source of truth for brand and contact details supplied by Fauzey. */
export const SITE = {
  name: 'Fauzey Peanut',
  wordmark: 'Fauzey',
  manufacturer: "Fauzey's Special Groundnut",
  handle: 'Fauzey Special Groundnut',
  statement: 'The craft of the humble nut.',
  description:
    'Fauzey Peanut is a premium Ghanaian peanut and peanut-butter house: peanut butter, crunchy peanuts, roasted salted peanuts, chilli lime peanut mix, premium peanut flour and gourmet peanut brittle.',
  email: 'fauzeyspecialgroundnut@gmail.com',
  bulkPhone: '+233555973723',
  bulkPhoneDisplay: '+233 555 973 723',
  whatsappNumber: '233555973723',
  location: 'Atimatim - Chairman, Ghana',
  country: 'Ghana',
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${SITE.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export const NAV_ITEMS = [
  { label: 'Shop', href: '/shop/' },
  { label: 'Atelier', href: '/atelier/' },
  { label: 'Our Story', href: '/story/' },
  { label: 'Gifts', href: '/gifts/' },
  { label: 'Journal', href: '/journal/' },
] as const;
