'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ToastProvider } from '../ui/toast';
import { CurrencyProvider } from '@/contexts/currency-context';
import { CMSProvider } from '@/contexts/cms-context';
import { Header } from '../website/Header';
import { Footer } from '../website/Footer';
import { MobileBottomCTA } from '../website/MobileBottomCTA';
import { AIChatWidget } from '../website/AIChatWidget';
import { CompareProvider } from '@/lib/compare-context';
import { CompareDrawer } from '../website/CompareDrawer';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // WordPress standalone admin portal for website content management
  const isWPAdminPage = pathname.startsWith('/wp-admin');

  if (isWPAdminPage) {
    return (
      <ToastProvider>
        <CMSProvider>
          {children}
        </CMSProvider>
      </ToastProvider>
    );
  }

  // Standalone Public Website layout
  return (
    <ToastProvider>
      <CMSProvider>
        <CurrencyProvider>
          <CompareProvider>
            <div className="min-h-screen flex flex-col bg-[#FEFEFE] text-[#000000] font-sans antialiased selection:bg-[#000000] selection:text-[#FEFEFE]">
              <Header />
              <main className="flex-1 pt-24 pb-16">
                {children}
              </main>
              <Footer />
              <CompareDrawer />
              <MobileBottomCTA />
              <AIChatWidget />
            </div>
          </CompareProvider>
        </CurrencyProvider>
      </CMSProvider>
    </ToastProvider>
  );
}
