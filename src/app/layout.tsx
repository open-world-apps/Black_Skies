import React from 'react';

import type { Metadata } from 'next';

import Header from './_ui/organisms/Header';

import { StoreProvider } from '@/lib/state/app/StoreProvider';
import AuthProvider from '@/lib/providers/AuthProvider';
import { GlobalFonts } from '@/lib/styled/GlobalFonts';
import GlobalStyles from '@/lib/styled/GlobalStyles';

export const metadata: Metadata = {
  title: 'Black Skies - Text-based Sci-Fi MMORPG',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <GlobalFonts />
          <GlobalStyles />
          <AuthProvider>
            <header>
              <Header />
            </header>
            {children}
          </AuthProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
