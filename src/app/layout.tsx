import React from 'react';

import type { Metadata } from 'next';
import { getCssText } from '@/lib/configs/stitches.config';
import Header from './_ui/organisms/Header';
import { StoreProvider } from '@/lib/state/app/StoreProvider';
import StitchesRegistry from '@/lib/stitches/registry';

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
        <head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </head>
        <body>
          <StitchesRegistry>
            <header>
              <Header />
            </header>
            {children}
          </StitchesRegistry>
        </body>
      </html>
    </StoreProvider>
  );
}
