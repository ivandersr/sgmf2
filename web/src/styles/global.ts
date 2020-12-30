import { createGlobalStyle } from 'styled-components';
import { shade } from 'polished';

const primaryColor = '#3e9c74';
const secondaryColor = '#c6c6c6';
const tertiaryColor = '#232129';
const backgroundColor = '#423f48';
const primaryTextColor = '#312e38';
const primaryTextColorActive = '#ddd';
const secondaryTextColor = '#212128';
const headerTextColor = '#eee';
const buttonLogoutColor = '#922323';
const menuTextColor = '#332f31';
const menuColor = '#2f9970';
const athleteMenuColor = '#e1e3e6';
const inputBackgroundColor = '#232129';
const inputPlaceholderColor = '#666360';
const inputTextColor = '#f4ede8';

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
    --primary-color-active: ${shade(0.3, primaryColor)};
    --primary-text-color-active: ${primaryTextColorActive};
    --secondary-color: ${secondaryColor};
    --secondary-text-color: ${secondaryTextColor};
    --secondary-color-hover: ${shade(0.1, secondaryColor)};
    --header-text-color: ${headerTextColor};
    --button-logout-color: ${buttonLogoutColor};
    --button-logout-color-hover: ${shade(0.1, buttonLogoutColor)};
    --menu-text-color: ${menuTextColor};
    --menu-color: ${menuColor};
    --menu-color-hover: ${shade(0.1, menuColor)};
    --athlete-menu-color: ${athleteMenuColor};
    --athlete-menu-color-hover:${shade(0.1, athleteMenuColor)};
    --tertiary-color: ${tertiaryColor};
    --input-background-color: ${inputBackgroundColor};
    --input-placeholder-color: ${inputPlaceholderColor};
    --input-text-color: ${inputTextColor};
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
