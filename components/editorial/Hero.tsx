'use client';
import { motion } from 'framer-motion';
import { ProductImage } from '@/components/commerce/ProductImage';
import { ButtonLink } from '@/components/ui/Button';

const ease = [0.22, 0.61, 0.36, 1] as const;

/** The one orchestrated moment on the site: the wordmark rises letter by letter, once. */
export function Hero() {
  const letters = 'Fauzey'.split('');
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-butter">
      <div className="page-x grid gap-10 pb-16 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-8">
          <h1 id="hero-title" className="font-serif text-espresso" style={{ lineHeight: 0.82, letterSpacing: '-0.035em' }}>
            <span className="sr-only">Fauzey Peanut. </span>
            <span aria-hidden className="block overflow-hidden pb-[0.08em]" style={{ fontSize: 'clamp(5.6rem, 21vw, 19rem)', fontWeight: 500 }}>
              {letters.map((l, i) => (
                <motion.span key={i} className="inline-block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.08 * i, ease }}>{l}</motion.span>
              ))}
            </span>
            <motion.span aria-hidden className="-mt-[0.1em] block pl-[8vw] font-serif italic text-chestnut lg:pl-[10rem]" style={{ fontSize: 'clamp(3rem, 11vw, 9.5rem)', fontWeight: 400 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}>
              Peanut
            </motion.span>
          </h1>

          <motion.div className="mt-10 max-w-xl lg:mt-14" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}>
            <p className="font-serif text-3xl leading-tight text-espresso sm:text-4xl">The craft of the humble nut.</p>
            <p className="mt-4 text-[1.02rem] text-ink/90">A Ghanaian peanut and peanut-butter house. Peanut butter, crunchy peanuts, roasted salted peanuts, a chilli lime mix, peanut flour and gourmet brittle.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop/" size="lg">Explore the collection</ButtonLink>
              <ButtonLink href="/atelier/" variant="secondary" size="lg">Find your Fauzey</ButtonLink>
            </div>
          </motion.div>
        </div>

        <motion.div className="lg:col-span-4 lg:mt-28" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, delay: 0.5 }}>
          <ProductImage stem="PB_500g" alt="Fauzey's Peanut Butter, 500g" name="Fauzey’s Peanut Butter" sizeLabel="500g" ratio="4 / 5" priority zoom={false} sizes="(min-width:1024px) 30vw, 100vw" className="border border-chestnut/30" />
          <p className="mt-3 text-sm text-chestnut">Fauzey’s Peanut Butter. Ingredient: groundnut.</p>
        </motion.div>
      </div>
    </section>
  );
}
