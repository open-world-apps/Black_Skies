'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body, html {
      background: url(/blackskies3.png);
      background-attachment: fixed;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: 0px 8px;
      box-sizing: border-box;
      min-height: 100vh;
      font-family: "Fira Code", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", Helvetica Neue, sans-serif;
      font-size: 16px;
      margin: 0;
      padding: 0;
      height: 100vh;
      color: white;
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

export default GlobalStyle;
