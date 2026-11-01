export const Skeleton = ({ className = '' }: { className?: string }) => <div aria-hidden="true" className={`skeleton ${className}`} />;

export function CatalogueSkeleton() {
  return (
    <div role="status" aria-label="Loading products" className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i}><Skeleton className="aspect-[4/5] w-full" /><Skeleton className="mt-4 h-5 w-3/4" /><Skeleton className="mt-2 h-4 w-1/2" /></div>
      ))}
    </div>
  );
}
