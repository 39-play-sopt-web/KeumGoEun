import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: #1A1B25;
    color: #FFFFFF;
  }

  a {
    color: inherit;
    text-decoration: none;
    }
`;