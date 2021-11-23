import styled from 'styled-components';
import { animated } from 'react-spring';

import { colors } from '../../constants/colors';

interface LinkProps {
  buttonDisabled: boolean;
}

export const Container = styled.main`
  position: absolute;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ProgressBar = styled.div`
  border-radius: 0.5rem;
  margin-top: 1rem;
  width: 20rem;
  height: 0.5rem;
  outline: 2px solid ${colors.neutral.darkest};

  > div {
    background: ${colors.primary};
    height: inherit;
    width: 0;
    border-radius: 0.5rem;
  }
`;

export const Button = styled(animated.div)<LinkProps>`
  > a {
    text-decoration: none;
    color: ${colors.primary};
    border: 2px solid ${colors.primary};
    padding: 0.75rem 1.5rem;
    background: transparent;
    font-weight: 600;
    border-radius: 1.5rem;

    cursor: ${(props) => (props.buttonDisabled ? 'auto' : 'pointer')};
  }
`;
