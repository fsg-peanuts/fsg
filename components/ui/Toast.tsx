'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

interface ToastItem { id: number; message: string; action?: { label: string; href?: string; onClick?: () => void } }
interface ToastApi { toast: (message: string, action?: ToastItem['action']) => void }

const Ctx = createContext<ToastApi>({ toast: () => {} });
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const seq = useRef(0);
  const toast = useCallback<ToastApi['toast']>((message, action) => {
    const id = ++seq.current;
    setItems((s) => [...s.slice(-2), { id, message, action }]);
    window.setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 5000);
  }, []);
  const api = useMemo(() => ({ toast }), [toast]);

  return (
    <Ctx.Provider value={api}>
      {children}
      <div role="status" aria-live="polite" aria-atomic="false" className="pointer-events-none fixed inset-x-0 bottom-20 z-[70] flex flex-col items-center gap-2 px-4 md:bottom-6">
        <AnimatePresence>
          {items.map((t) => (
            <motion.div key={t.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="pointer-events-auto flex max-w-md items-center gap-3 bg-espresso px-5 py-3 text-sm text-snow shadow-[0_0_0_1px_#B46F39]" data-tone="dark">
              <Check aria-hidden className="h-4 w-4 shrink-0 text-butter" />
              <span>{t.message}</span>
              {t.action?.href && <Link href={t.action.href} className="ml-2 shrink-0 font-semibold text-butter underline underline-offset-4">{t.action.label}</Link>}
              {t.action?.onClick && <button type="button" onClick={t.action.onClick} className="ml-2 shrink-0 font-semibold text-butter underline underline-offset-4">{t.action.label}</button>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}
