import React from 'react';

import type { Metadata } from 'next';
import GlobalStyle from '@/app/_ui/layouts/GlobalStyle';
import StyledComponentsRegistry from '@/lib/registry';
import Header from './_ui/organisms/Header';
import { StoreProvider } from '@/lib/state/app/StoreProvider';

export const metadata: Metadata = {
  title: 'Black Skies - Text-based Sci-Fi MMORPG',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <StyledComponentsRegistry>
            <GlobalStyle />
            <header>
              <Header />
            </header>
            {children}
          </StyledComponentsRegistry>
        </body>
      </html>
    </StoreProvider>
  );
}
