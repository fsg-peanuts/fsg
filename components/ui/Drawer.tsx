'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { useDialog } from '@/components/ui/useDialog';

type Side = 'left' | 'right' | 'top';

function Panel({ side, label, onClose, children, className }: { side: Side; label: string; onClose: () => void; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(onClose, ref);
  const from = side === 'left' ? { x: '-100%' } : side === 'right' ? { x: '100%' } : { y: '-100%' };
  const pos = side === 'left' ? 'left-0 top-0 h-full w-[min(26rem,92vw)]' : side === 'right' ? 'right-0 top-0 h-full w-[min(30rem,100vw)]' : 'left-0 top-0 w-full max-h-[90vh]';
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[60] bg-ink/55"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        ref={ref} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}
        className={`fixed z-[61] flex flex-col overflow-y-auto bg-cream shadow-[0_0_0_1px_#DCC09A] ${pos} ${className ?? ''}`}
        initial={from} animate={{ x: 0, y: 0 }} exit={from} transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <button type="button" onClick={onClose} aria-label={`Close ${label.toLowerCase()}`}
          className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center text-espresso hover:bg-butter/60">
          <X aria-hidden className="h-5 w-5" />
        </button>
        {children}
      </motion.div>
    </>
  );
}

export function Drawer({ open, onClose, side, label, children, className }: { open: boolean; onClose: () => void; side: Side; label: string; children: ReactNode; className?: string }) {
  return <AnimatePresence>{open && <Panel side={side} label={label} onClose={onClose} className={className}>{children}</Panel>}</AnimatePresence>;
}
