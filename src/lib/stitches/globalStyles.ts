'use client';

import { globalCss } from '@stitches/react';

const globalStyles = globalCss({
  '*': { margin: 0, padding: 0 },
  '*, *:before, *:after': { boxSizing: 'inherit' },
  'body, html': {
    background: 'url(/blackskies3.png)',
    backgroundAttachment: 'fixed',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0px 8px',
    boxSizing: 'border-box',
    minHeight: '100vh',
    fontFamily:
      '"Fira Code", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, ' +
      'Cantarell, "Fira Sans", "Droid Sans", Helvetica Neue, sans- serif',
    fontSize: '16px',
    margin: '0',
    padding: '0',
    height: '100vh',
    color: 'White',
  },
  body: {},
  img: {
    maxWidth: '100%',
    display: 'block',
  },
  a: {
    color: 'White',
    fontFamily: '"Fira Code", sans-serif',
  },

  main: {
    height: '100%',
  },
  '#__next': {
    height: '100vh',
  },
});

export default globalStyles;
