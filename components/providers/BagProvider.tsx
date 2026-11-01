'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import { track } from '@/lib/analytics';
import { bagReducer, summariseBag, type BagLine, type BagSummary } from '@/lib/commerce/bag';
import { BAG_STORAGE_KEY } from '@/lib/config/commerce';
import { getVariantWithProduct } from '@/lib/data/catalogue';

interface BagApi {
  lines: BagLine[];
  summary: BagSummary;
  /** False until the persisted bag has been read on the client (avoids hydration mismatch). */
  hydrated: boolean;
  add: (variantId: string, quantity?: number) => void;
  remove: (variantId: string) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  changeVariant: (from: string, to: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
}

const Ctx = createContext<BagApi | null>(null);

export function useBag(): BagApi {
  const v = useContext(Ctx);
  if (!v) throw new Error('useBag must be used inside <BagProvider>');
  return v;
}

function readStored(): BagLine[] {
  try {
    const raw = localStorage.getItem(BAG_STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((l): l is BagLine => typeof l?.variantId === 'string' && Number.isFinite(l?.quantity));
  } catch {
    return [];
  }
}

export function BagProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(bagReducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: 'hydrate', lines: readStored() });
    setHydrated(true);
    const onStorage = (e: StorageEvent) => { if (e.key === BAG_STORAGE_KEY) dispatch({ type: 'hydrate', lines: readStored() }); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(lines)); } catch { /* storage unavailable (private mode) */ }
  }, [lines, hydrated]);

  const add = useCallback((variantId: string, quantity = 1) => { dispatch({ type: 'add', variantId, quantity }); track('add_to_bag', { variantId, quantity }); }, []);
  const remove = useCallback((variantId: string) => { dispatch({ type: 'remove', variantId }); track('remove_from_bag', { variantId }); }, []);
  const setQuantity = useCallback((variantId: string, quantity: number) => dispatch({ type: 'setQuantity', variantId, quantity }), []);
  const changeVariant = useCallback((from: string, to: string) => dispatch({ type: 'changeVariant', from, to }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);
  const openBag = useCallback(() => setDrawerOpen(true), []);
  const closeBag = useCallback(() => setDrawerOpen(false), []);

  const summary = useMemo(() => summariseBag(lines, getVariantWithProduct), [lines]);
  const value = useMemo<BagApi>(
    () => ({ lines, summary, hydrated, add, remove, setQuantity, changeVariant, clear, drawerOpen, openBag, closeBag }),
    [lines, summary, hydrated, add, remove, setQuantity, changeVariant, clear, drawerOpen, openBag, closeBag],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
