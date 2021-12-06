import { createGlobalStyle } from 'styled-components';
import { colors } from '../constants/colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: ${colors.neutral.lightest};
  }

  body, input, button {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: ${colors.neutral.darkest};
    --webkit-font-smothing: atialiased;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }
`;
