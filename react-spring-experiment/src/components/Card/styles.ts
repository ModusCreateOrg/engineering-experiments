import styled from 'styled-components';
import { animated } from 'react-spring';

import { colors } from '../../constants/colors';

export const Container = styled(animated.div)`
  background: ${colors.neutral.white};
  width: 100%;
  height: fit-content;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 8px 0px ${colors.neutral.darkestWithOpacity};
  position: relative;

  > span {
    color: ${colors.neutral.dark};
    font-weight: 500;
    font-size: 0.75rem;
  }

  img {
    width: 10rem;
    display: block;
    margin: 0 auto;
  }

  > button {
    position: absolute;
    right: 1.5rem;
  }
`;

export const CardHeading = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  button {
    background: transparent;
    border: 0;
    font-weight: 600;
  }
`;

export const Content = styled(animated.div)`
  overflow: hidden;
  padding-top: 0.5rem;

  > h3 {
    margin-top: 0.75rem;
  }

  > p {
    color: ${colors.neutral.dark};
    margin-top: 0.5rem;
  }
`;
