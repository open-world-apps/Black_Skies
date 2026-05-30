'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --bs-bg: #06080d;
    --bs-ink: #dfe4ea;
    --bs-ink-dim: #6f7a87;
    --bs-line: rgba(150, 170, 190, 0.14);
    --bs-amber: #e8932f;
    --bs-teal: #3fb9c9;
    --bs-accent: var(--bs-amber);
    --bs-accent2: var(--bs-teal);
    --bs-danger: #d8533f;
    --bs-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;
    --bs-display: 'Chakra Petch', sans-serif;
    --bs-crt: 0.5;
  }

  @keyframes bs-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  /* Entrance motion animates transform only (never opacity) so content stays
     visible even if the timeline is paused/throttled. */
  @keyframes bs-step-in {
    from { transform: translateY(12px); }
    to { transform: none; }
  }

  @keyframes bs-pop-in {
    from { transform: scale(0.975); }
    to { transform: none; }
  }

  .bs-blink { animation: bs-blink 1s step-end infinite; }
  .bs-step { opacity: 1; animation: bs-step-in 0.42s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
  .bs-pop { opacity: 1; animation: bs-pop-in 0.28s cubic-bezier(0.2, 0.8, 0.2, 1) both; }

  * {
    margin: 0;
    padding: 0;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  html, body {
    background: url(/blackskies3.png);
    background-attachment: fixed;
    background-size: 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
    min-height: 100vh;
    font-family: "Fira Code", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
                 Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;
    height: 100vh;
    color: white;
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    color: white;
    font-family: "Fira Code", sans-serif;
  }

  main {
    height: 100%;
  }

  #__next {
    height: 100vh;
  }
`;

export default GlobalStyles;
