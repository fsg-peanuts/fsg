'use client';
import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import { BagProvider } from '@/components/providers/BagProvider';
import { ToastProvider } from '@/components/ui/Toast';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <BagProvider>{children}</BagProvider>
      </ToastProvider>
    </MotionConfig>
  );
}
