import React from 'react';

import type { Metadata } from 'next';

import Header from './_ui/organisms/Header';

import { getCssText } from '@/lib/configs/stitches.config';
import { StoreProvider } from '@/lib/state/app/StoreProvider';
import StitchesRegistry from '@/lib/stitches/registry';
import AuthProvider from '@/lib/providers/AuthProvider';

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
      <StitchesRegistry>
        <html lang="en">
          <head>
            <style
              id="stitches"
              dangerouslySetInnerHTML={{ __html: getCssText() }}
            />
          </head>
          <body>
            <AuthProvider>
              <header>
                <Header />
              </header>
              {children}
            </AuthProvider>
          </body>
        </html>
      </StitchesRegistry>
    </StoreProvider>
  );
}
