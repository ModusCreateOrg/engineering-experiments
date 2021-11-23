import styled from 'styled-components';
import { animated } from 'react-spring';

import { colors } from '../../constants/colors';

interface ContainerProps {
  buttonDisabled: boolean;
}

export const Container = styled.main<ContainerProps>`
  height: 100vh;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;

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

  > button {
    cursor: ${(props) => (props.buttonDisabled ? 'auto' : 'pointer')};

    a {
      cursor: ${(props) => (props.buttonDisabled ? 'auto' : 'pointer')};
    }
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

export const Button = styled(animated.button)`
  border: 2px solid ${colors.primary};
  padding: 0.75rem 1.5rem;
  background: transparent;
  font-weight: 600;
  border-radius: 1.5rem;

  > a {
    text-decoration: none;
    color: ${colors.primary};
  }
`;
