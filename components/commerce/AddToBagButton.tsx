'use client';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useBag } from '@/components/providers/BagProvider';
import { buttonClass } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

type Phase = 'idle' | 'adding' | 'added';

export function AddToBagButton({ variantId, quantity = 1, productName, sizeLabel, compact = false, className = '' }: { variantId: string; quantity?: number; productName: string; sizeLabel: string; compact?: boolean; className?: string }) {
  const { add } = useBag();
  const { toast } = useToast();
  const [phase, setPhase] = useState<Phase>('idle');
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  function onClick() {
    if (phase !== 'idle') return;
    setPhase('adding');
    timers.current.push(window.setTimeout(() => {
      add(variantId, quantity);
      setPhase('added');
      toast(`${quantity > 1 ? `${quantity} × ` : ''}${productName}, ${sizeLabel} added to your bag.`, { label: 'View bag', href: '/bag/' });
      timers.current.push(window.setTimeout(() => setPhase('idle'), 1800));
    }, 350));
  }

  const label = phase === 'adding' ? 'Adding…' : phase === 'added' ? 'Added' : compact ? 'Quick add' : 'Add to bag';
  return (
    <button type="button" onClick={onClick} aria-disabled={phase !== 'idle'} className={buttonClass('primary', 'md', `${compact ? 'min-h-[2.75rem] px-4 text-[0.72rem]' : 'w-full'} ${className}`)}>
      {phase === 'added' && <Check aria-hidden className="h-4 w-4" />}
      <span aria-live="polite">{label}</span>
      <span className="sr-only">{`: ${productName}, ${sizeLabel}`}</span>
    </button>
  );
}
