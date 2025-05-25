import React from 'react';

import type { Metadata } from 'next';
import GlobalStyle from '@/app/_ui/layouts/GlobalStyle';
import StyledComponentsRegistry from '@/lib/registry';

export const metadata: Metadata = {
   title: 'Black Skies - Text-based Sci-Fi MMORPG',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body>
            <StyledComponentsRegistry>
               <GlobalStyle />
               {children}
            </StyledComponentsRegistry>
         </body>
      </html>
   );
}
