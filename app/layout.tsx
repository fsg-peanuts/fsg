import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import '@fontsource-variable/manrope';
import './globals.css';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { BagDrawer } from '@/components/commerce/BagDrawer';
import { AnnouncementBar } from '@/components/navigation/AnnouncementBar';
import { Footer } from '@/components/navigation/Footer';
import { Header } from '@/components/navigation/Header';
import { AppProviders } from '@/components/providers/AppProviders';
import { SITE } from '@/lib/config/site';
import { SITE_URL } from '@/lib/utils/assets';

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: { default: `${SITE.name} | ${SITE.statement}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: { siteName: SITE.name, locale: 'en_GH', type: 'website' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#611F0A' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GH">
      <body>
        <AppProviders>
          <a href="#main" className="sr-only-focusable fixed left-3 top-3 z-[100] bg-snow px-4 py-3 font-semibold text-espresso">Skip to content</a>
          <AnnouncementBar />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
          <Footer />
          <BagDrawer />
        </AppProviders>
      </body>
    </html>
  );
}
