import type { Category } from '@/lib/domain/types';

export const CATEGORIES: Category[] = [
  {
    id: 'peanut-butter',
    slug: 'peanut-butter',
    name: 'Peanut Butter',
    summary: 'Groundnut is the only ingredient.',
    imageCode: 'PB',
  },
  {
    id: 'crunchy-peanuts',
    slug: 'crunchy-peanuts',
    name: 'Crunchy Peanuts',
    summary: 'Whole crunchy peanuts for snacking, cooking and baking.',
    imageCode: 'CP',
  },
  {
    id: 'chilli-lime-mix',
    slug: 'chilli-lime-peanut-mix',
    name: 'Chilli Lime Peanut Mix',
    summary: 'A peanut mix with chilli and lime.',
    imageCode: 'CLPM',
  },
  {
    id: 'roasted-salted-peanuts',
    slug: 'roasted-salted-peanuts',
    name: 'Roasted Salted Peanuts',
    summary: 'Roasted, salted peanuts for snacking.',
    imageCode: 'RSP',
  },
  {
    id: 'peanut-flour',
    slug: 'peanut-flour',
    name: 'Premium Peanut Flour',
    summary: 'Premium peanut flour for the kitchen.',
    imageCode: 'PPF',
  },
  {
    id: 'peanut-brittle',
    slug: 'peanut-brittle',
    name: 'Gourmet Peanut Brittle',
    summary: 'Gourmet peanut brittle.',
    imageCode: 'GPB',
  },
  {
    id: 'gifts',
    slug: 'gift-collections',
    name: 'Gift Collections',
    summary: 'Fauzey collection packs.',
    imageCode: 'FCP / FPB',
  },
];

export const getCategoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id);
