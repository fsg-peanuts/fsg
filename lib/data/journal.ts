import type { Article, ArticleCategory } from '@/lib/domain/types';

/**
 * Journal content. Rules: no testimonials, no health or scientific claims, no invented company
 * history. Serving ideas and facts supplied by Fauzey (ingredients, storage, directions for use,
 * label fields) only.
 */
export const ARTICLE_CATEGORIES: { id: ArticleCategory; label: string }[] = [
  { id: 'recipes', label: 'Recipes' },
  { id: 'peanut-education', label: 'Peanut education' },
  { id: 'product-guides', label: 'Product guides' },
  { id: 'brand-stories', label: 'Brand stories' },
  { id: 'food-inspiration', label: 'Food inspiration' },
];

export const ARTICLES: Article[] = [
  {
    slug: 'the-humble-nut',
    title: 'The humble nut',
    excerpt: 'Why Fauzey starts, and stays, with one simple ingredient.',
    category: 'brand-stories',
    readMinutes: 3,
    imageStem: 'PB_500g',
    relatedProductSlugs: ['peanut-butter', 'crunchy-peanuts'],
    blocks: [
      { type: 'p', text: 'Groundnut is one of the most familiar ingredients in Ghanaian kitchens. It turns up in soups and stews, in snacks sold by the roadside, and in the jar on the breakfast table.' },
      { type: 'p', text: 'Fauzey Peanut is built on a simple belief: an ingredient this familiar deserves to be treated with care. Fauzey’s Peanut Butter and Fauzey’s Crunchy Peanuts each list one ingredient, groundnut, and the rest of the label tells you what you need to know.' },
      { type: 'h2', text: 'A short label, on purpose' },
      { type: 'p', text: 'Every pack carries its net weight, ingredients, manufacture and expiry dates, batch number, manufacturer and regulatory references. We think a food house should be easy to check.' },
      { type: 'p', text: 'That is what we mean by the craft of the humble nut: simple ingredients, honest details, and food made to be shared.' },
    ],
  },
  {
    slug: 'peanut-or-groundnut',
    title: 'Peanut or groundnut? Two names, one nut',
    excerpt: 'Why you will see both words on Fauzey packs and on this website.',
    category: 'peanut-education',
    readMinutes: 2,
    relatedProductSlugs: ['peanut-butter'],
    blocks: [
      { type: 'p', text: 'In Ghana, people often say groundnut. In many other parts of the world, the same nut is called a peanut. They are the same thing, and you will see both words here.' },
      { type: 'p', text: 'On our labels the ingredient is written as groundnut. On the shop, we say peanut butter and peanut flour because that is what most customers search for. The nut inside is the same.' },
      { type: 'h2', text: 'What to look for' },
      { type: 'ul', items: ['Ingredients: the Peanut Butter and Crunchy Peanuts list groundnut only.', 'Storage: keep your pack in a cool, dry place.', 'Dates: check the manufacturing and expiry dates printed on each pack.'] },
    ],
  },
  {
    slug: 'how-to-read-a-fauzey-label',
    title: 'How to read a Fauzey label',
    excerpt: 'Net weight, batch number, FDA reference: what each line on the pack is for.',
    category: 'peanut-education',
    readMinutes: 3,
    relatedProductSlugs: ['peanut-butter', 'crunchy-peanuts'],
    blocks: [
      { type: 'p', text: 'A food label is a small promise. Here is what each part of a Fauzey Peanut Butter or Crunchy Peanuts label tells you.' },
      { type: 'ul', items: ['Net weight: the weight of the food inside, matching the size you chose.', 'Ingredients: the list of what is in the pack. For these two products, it reads groundnut.', 'Manufacturing date and expiry date: printed on each pack, and different from batch to batch.', 'Batch number: identifies the production batch, which helps with traceability.', 'Manufactured by: Fauzey’s Special Groundnut, Atimatim - Chairman, Ghana.', 'Registration and FDA reference: regulatory references shown for the specific product.', 'Storage: store in a cool, dry place.'] },
      { type: 'p', text: 'If you have a question about a pack in your hands, email us or message us on WhatsApp and quote the batch number.' },
    ],
  },
  {
    slug: 'peanut-butter-on-toast-three-ways',
    title: 'Peanut butter on toast, three ways',
    excerpt: 'Three simple ways to dress a slice, using what is already in your kitchen.',
    category: 'recipes',
    readMinutes: 2,
    relatedProductSlugs: ['peanut-butter'],
    blocks: [
      { type: 'p', text: 'Fauzey’s Peanut Butter is made for spreading. Toast a slice of bread, spread the peanut butter while the bread is warm, and then make it your own.' },
      { type: 'ol', items: ['With fruit: add slices of ripe banana or mango on top.', 'With something savoury: finish with a pinch of salt and a few slices of cucumber.', 'With crunch: scatter a spoonful of Fauzey’s Crunchy Peanuts over the spread.'] },
      { type: 'p', text: 'Quantities are up to you. Start with a thin layer and add more if you like.' },
    ],
  },
  {
    slug: 'a-peanut-butter-smoothie-from-the-pantry',
    title: 'A peanut butter smoothie from the pantry',
    excerpt: 'Smoothies are one of the directions for use printed on our peanut butter.',
    category: 'recipes',
    readMinutes: 2,
    relatedProductSlugs: ['peanut-butter', 'crunchy-peanuts'],
    blocks: [
      { type: 'p', text: 'Smoothies are one of the ways we suggest you enjoy Fauzey’s Peanut Butter and Crunchy Peanuts. Here is a simple starting point.' },
      { type: 'ul', items: ['One or two spoonfuls of Fauzey’s Peanut Butter.', 'A ripe banana.', 'Milk or a milk alternative, enough to blend.', 'Ice, if you like it cold.'] },
      { type: 'p', text: 'Blend until smooth. Taste, and adjust: add more peanut butter for a richer smoothie, or more milk for a lighter one.' },
    ],
  },
  {
    slug: 'peanut-butter-or-crunchy-peanuts',
    title: 'Peanut butter or crunchy peanuts?',
    excerpt: 'Two Fauzey products with one ingredient each, and how they are used.',
    category: 'product-guides',
    readMinutes: 2,
    relatedProductSlugs: ['peanut-butter', 'crunchy-peanuts'],
    blocks: [
      { type: 'p', text: 'Fauzey’s Peanut Butter and Fauzey’s Crunchy Peanuts both list groundnut as the only ingredient. The difference is the form.' },
      { type: 'h2', text: 'Choose peanut butter if' },
      { type: 'ul', items: ['You want a spread for toast.', 'You like to stir peanut butter into smoothies and baking.'] },
      { type: 'h2', text: 'Choose crunchy peanuts if' },
      { type: 'ul', items: ['You want a snack you can eat by the handful.', 'You like to add whole peanuts to cooking or baking.'] },
      { type: 'p', text: 'Both are suggested for snacking, cooking, baking and smoothies. Many kitchens keep both.' },
    ],
  },
  {
    slug: 'a-small-tasting-table',
    title: 'A small tasting table',
    excerpt: 'Set out the Fauzey range and let guests choose.',
    category: 'food-inspiration',
    readMinutes: 2,
    relatedProductSlugs: ['roasted-salted-peanuts', 'chilli-lime-peanut-mix', 'gourmet-peanut-brittle'],
    blocks: [
      { type: 'p', text: 'The easiest way to host is to put out a few small bowls and let people help themselves.' },
      { type: 'ul', items: ['A bowl of Roasted Salted Peanuts.', 'A bowl of Chilli Lime Peanut Mix.', 'A plate of Gourmet Peanut Brittle, broken into pieces.', 'A jar of Fauzey’s Peanut Butter with a spoon, and something to dip.'] },
      { type: 'p', text: 'Small bowls make it easy to refill, and a mix of textures keeps the table interesting.' },
    ],
  },
  {
    slug: 'choosing-your-size',
    title: 'Choosing your size',
    excerpt: 'Fauzey packs range from 50g to 1kg. Here is a way to think about it.',
    category: 'product-guides',
    readMinutes: 2,
    relatedProductSlugs: ['peanut-butter'],
    blocks: [
      { type: 'p', text: 'Most Fauzey products come in sizes from 50g up to 1kg. A good size is the one you will finish while it is fresh.' },
      { type: 'ul', items: ['Small packs: a good way to try a product, or to put in a bag.', 'Medium packs: everyday sizes for a household.', 'Large packs: for sharing, for events, or for stocking the pantry. For bulk purchases, call or message us.'] },
      { type: 'p', text: 'Whatever you choose, store the pack in a cool, dry place and check the expiry date printed on it.' },
    ],
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const categoryLabel = (id: ArticleCategory) => ARTICLE_CATEGORIES.find((c) => c.id === id)?.label ?? id;
