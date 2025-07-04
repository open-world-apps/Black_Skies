'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'ABC Ginto Discord';
    src: url('/Discord/Discord-Fonts_121624/ABC Ginto Discord/ABC Ginto Discord Complete Web/ABCGintoDiscord-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'ABC Ginto Discord';
    src: url('/Discord/Discord-Fonts_121624/ABC Ginto Discord/ABC Ginto Discord Complete Web/ABCGintoDiscord-Medium.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'ABC Ginto Discord Nord';
    src: url('/Discord/Discord-Fonts_121624/ABC Ginto Discord Nord/ABC Ginto Discord Nord Complete Web/ABCGintoDiscordNord-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`;
