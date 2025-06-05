import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      primary: 'blue',
      background: '#111',
    },
  },
  utils: {
    h: (value: string) => ({
      height: value,
    }),
    w: (value: string) => ({
      width: value,
    }),
    d: (value: string) => ({
      display: value,
    }),
  },
});
