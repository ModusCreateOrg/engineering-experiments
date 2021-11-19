import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.button`
  background: transparent;
  border: 0;

  width: 2rem;
  height: 2rem;
`;

export const Circle = styled(animated.div)`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  margin: auto;
  border-radius: 50%;
  background: #ffba08;
`;
