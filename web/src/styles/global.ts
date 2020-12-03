import { createGlobalStyle } from 'styled-components';
import { shade } from 'polished';

const primaryColor = '#3e9c74';
const secondaryColor = '#a6a6a6';
const backgroundColor = '#423f48';
const primaryTextColor = '#312e38';
const secondaryTextColor = '#212128';
const headerTextColor = '#eee';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    --background-color: ${backgroundColor};
    --primary-color: ${primaryColor};
    --primary-text-color: ${primaryTextColor};
    --primary-color-hover: ${shade(0.2, primaryColor)};
    --secondary-color: ${secondaryColor};
    --secondary-text-color: ${secondaryTextColor};
    --secondary-color-hover: ${shade(0.1, secondaryColor)};
    --header-text-color: ${headerTextColor};
  }

  body {
    background: var(--background-color);
    color: #FFF;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

`;
