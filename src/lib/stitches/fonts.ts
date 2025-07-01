import { globalCss } from '../configs/stitches.config';

const fonts = globalCss({
  '@font-face': [
    {
      fontFamily: '"ABC Ginto Discord"',
      src: 'url("/Discord/Discord-Fonts_121624/ABC Ginto Discord/ABC Ginto Discord Complete Web/ABCGintoDiscord-Regular.woff2") format("woff2")',
      fontWeight: '400',
      fontStyle: 'normal',
      fontDisplay: 'swap',
    },
    {
      fontFamily: '"ABC Ginto Discord"',
      src: 'url("/Discord/Discord-Fonts_121624/ABC Ginto Discord/ABC Ginto Discord Complete Web/ABCGintoDiscord-Medium.woff2") format("woff2")',
      fontWeight: '700',
      fontStyle: 'normal',
      fontDisplay: 'swap'
    },
    {
      fontFamily: '"ABC Ginto Discord Nord"',
      src: 'url("/Discord/Discord-Fonts_121624/ABC Ginto Discord Nord/ABC Ginto Discord Nord Complete Web/ABCGintoDiscordNord-Bold.woff2") format("woff2")',
      fontWeight: '700',
      fontStyle: 'normal',
      fontDisplay: 'swap',
    }
  ],
});

export default fonts;
