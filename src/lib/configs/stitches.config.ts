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
    fonts: {
      Discord: '"ABC Ginto Discord"',
      DiscordNord: '"ABC Ginto Discord Nord"'
    },
    fontWeights: {
      normal: '400',
      bold: '700'
    },
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
