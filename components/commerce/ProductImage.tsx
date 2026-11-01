import { PeanutMark } from '@/components/brand/PeanutMark';
import { resolveImage } from '@/lib/data/images';

interface Props {
  stem?: string;
  alt: string;
  /** Used by the placeholder only. */
  name: string;
  sizeLabel?: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  zoom?: boolean;
}

/**
 * Renders the real Fauzey photograph when it exists in public/images/products; otherwise a designed
 * placeholder. Never substitutes stock photography.
 */
export function ProductImage({ stem, alt, name, sizeLabel, ratio = '1 / 1', className = '', sizes = '(min-width:1024px) 33vw, 50vw', priority = false, zoom = true }: Props) {
  const img = resolveImage(stem);
  return (
    <div className={`relative overflow-hidden bg-snow ${className}`} style={{ aspectRatio: ratio }}>
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export + unoptimized images: plain <img> keeps basePath handling explicit
        <img
          src={img.src}
          srcSet={img.srcSet}
          sizes={img.srcSet ? sizes : undefined}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          className={`h-full w-full object-contain p-3 transition-transform duration-[600ms] ease-out ${zoom ? 'motion-safe:group-hover:scale-[1.03]' : ''}`}
        />
      ) : (
        <div role="img" aria-label={`${alt} (photograph coming soon)`} className="flex h-full w-full flex-col items-center justify-center gap-3 bg-butter px-4 text-center text-chestnut">
          <PeanutMark detail className="h-auto w-1/2 max-w-[9rem] text-chestnut/70" />
          <span aria-hidden className="font-serif text-lg leading-tight text-espresso">{name}{sizeLabel ? `, ${sizeLabel}` : ''}</span>
          <span aria-hidden className="text-[0.68rem] font-semibold uppercase tracking-label text-espresso">Photograph coming soon</span>
          {process.env.NODE_ENV !== 'production' && stem && <span aria-hidden className="text-[0.65rem] text-muted/80">expects {stem}.png|jpg|webp</span>}
        </div>
      )}
    </div>
  );
}
