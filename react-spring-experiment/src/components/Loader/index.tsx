import React, { HTMLAttributes } from 'react';
import { useTrail } from 'react-spring';

import { Container, Circle } from './styles';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {}

const Loader: React.FC<LoaderProps> = ({ style }) => {
  const trail = useTrail(3, {
    config: { mass: 1, tension: 120, friction: 14, velocity: 0.1 },
    y: -1,
    from: { y: 0 },
    loop: true,
  });

  return (
    <Container style={style}>
      {trail.map((props, index) => (
        <Circle style={props} key={index} />
      ))}
    </Container>
  );
};

export default Loader;
