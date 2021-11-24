import styled from 'styled-components';
import { animated } from 'react-spring';

import { colors } from '../../constants/colors';

export const Container = styled.div`
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
`;

export const Circle = styled(animated.div)`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${colors.neutral.dark};
  margin: auto;

  &:nth-child(2) {
    margin: auto 0.35rem;
  }
`;
