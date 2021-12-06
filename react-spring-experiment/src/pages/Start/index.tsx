import React, { useState } from 'react';
import { useSpring, animated, useSpringRef, useChain } from 'react-spring';
import { Link } from 'react-router-dom';

import { Container, ProgressBar, Button } from './styles';

const Start: React.FC = () => {
  const [disabled, setDisabled] = useState(true);

  const progressAnimationRef = useSpringRef();
  const { number, ...progressAnimation } = useSpring({
    from: {
      width: '0',
      number: 0,
    },
    to: {
      width: '100%',
      number: 100,
    },
    config: { duration: 5000 },
    ref: progressAnimationRef,
    onRest: () => {
      setDisabled(false);
    },
  });

  const buttonAnimationRef = useSpringRef();
  const buttonAnimation = useSpring({
    from: {
      opacity: 0,
      marginTop: '0rem',
    },
    to: {
      opacity: 1,
      marginTop: '2rem',
    },
    ref: buttonAnimationRef,
  });

  useChain([progressAnimationRef, buttonAnimationRef]);

  return (
    <Container>
      <div>
        <animated.h2>
          {number.to((n) => `${String(n.toFixed(0)).padStart(2, '0')}%`)}
        </animated.h2>
        <ProgressBar>
          <animated.div style={progressAnimation} />
        </ProgressBar>
      </div>
      <Button style={buttonAnimation} buttonDisabled={disabled}>
        <Link to="pokedex" hidden={disabled}>
          Start Pokedex
        </Link>
      </Button>
    </Container>
  );
};

export default Start;
