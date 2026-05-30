'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

// Collects styled-components styles during SSR and flushes them into the
// document head before first paint — without this the App Router streams raw
// HTML and styles only apply after hydration (FOUC).
export default function StyledRegistry({ children }: { children: React.ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  // On the client, render children directly (no extra sheet wrapping).
  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
  );
}
