import React from 'react';

import type { Metadata } from 'next';

import ApolloProvider from '@/lib/providers/ApolloProvider';
import AuthProvider from '@/lib/providers/AuthProvider';
import { StoreProvider } from '@/lib/state/app/StoreProvider';
import { GlobalFonts } from '@/lib/styled/GlobalFonts';
import GlobalStyles from '@/lib/styled/GlobalStyles';
import StyledRegistry from '@/lib/styled/StyledRegistry';

export const metadata: Metadata = {
  title: 'Black Skies - Text-based Sci-Fi MMORPG',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Michroma&family=Oxanium:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <StyledRegistry>
            <GlobalFonts />
            <GlobalStyles />
            <AuthProvider>
              <ApolloProvider>{children}</ApolloProvider>
            </AuthProvider>
          </StyledRegistry>
        </body>
      </html>
    </StoreProvider>
  );
}
