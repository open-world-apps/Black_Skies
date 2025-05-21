import {
    DefaultTheme,
    ThemeProvider,
    createGlobalStyle,
  } from 'styled-components';
  import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

  const GlobalStyle = createGlobalStyle`
    body, html {
      background-color:rgb(241, 229, 229);
      box-sizing: border-box;
      font-family: "Fira Code", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", Helvetica Neue, sans-serif;
      font-size: 16px;
      margin: 0;
      padding: 0;
      height: 100vh;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
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

  const theme: DefaultTheme = {
    colors: {
      primary: '#261f1f',
    },
  };
  
  function MyApp({ Component, pageProps, router }: AppProps) {
    const url = `https://example-url.com${router.route}`;
    return (
      <>
        <DefaultSeo
          titleTemplate="%s"
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url,
            description:'An example SEO configuration',
            site_name: 'NASC Template',
            images: [],
          }}
          canonical={url}
          twitter={{
            handle: '@c0dezer019',
            site: '@c0dezer019',
            cardType: 'summary_large_image',
          }}
          robotsProps={{
            noarchive: true,
            maxImagePreview: 'standard',
          }}
        />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} canonical={url} key={url} />
        </ThemeProvider>
      </>
    );
  }
  
  export default MyApp;
