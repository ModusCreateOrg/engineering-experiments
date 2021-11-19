import React, { useState, useCallback } from 'react';
import { animated, useSpring } from 'react-spring';
import { FiStar } from 'react-icons/fi';

import { Container, Circle } from './styles';

const useAngularAnimation = (index: number, trigger: boolean) => {
  let angle = index * (360 / 5);
  // By default in JS, 0-degrees is the 3-o'clock
  // position, but I want my animation to start at
  // the 12-o'clock position, so I'll subtract
  // 90 degrees
  angle -= 90;

  const angleInRads = (angle * Math.PI) / 180;
  const distance = 28;
  const x = distance * Math.cos(angleInRads);
  const y = distance * Math.sin(angleInRads);

  const style = useSpring({
    x: trigger ? x : 0,
    y: trigger ? y : 0,
    scale: trigger ? 0.25 : 1,
    opacity: trigger ? 0 : 1,
    config: { duration: 250 },
  });

  return style;
};

const FavButton: React.FC = () => {
  const [isFav, setIsFav] = useState(false);
  const [triggerStarAnimation, setTriggerStarAnimation] = useState(false);
  const [triggerCirclesAnimation, setTriggerCirclesAnimation] = useState(false);

  const clickAnimation = useSpring({
    display: 'block',
    transform: triggerStarAnimation ? `scale(1.2)` : `scale(1)`,
    onRest: () => {
      setTriggerStarAnimation(false);
    },
    config: { duration: 200 },
  });

  const circlesAnimation = [
    useAngularAnimation(0, triggerCirclesAnimation),
    useAngularAnimation(1, triggerCirclesAnimation),
    useAngularAnimation(2, triggerCirclesAnimation),
    useAngularAnimation(3, triggerCirclesAnimation),
    useAngularAnimation(4, triggerCirclesAnimation),
  ];

  const handleClick = useCallback(() => {
    setTriggerStarAnimation((prev) => !prev);
    setTriggerCirclesAnimation((prev) => !prev);
    setIsFav((prev) => !prev);
  }, []);

  return (
    <Container onClick={handleClick}>
      <animated.span style={clickAnimation}>
        <FiStar size={24} fill={isFav ? '#ffba08' : 'white'} />
      </animated.span>
      {circlesAnimation.map((style) => (
        <Circle style={triggerCirclesAnimation ? style : {}} />
      ))}
    </Container>
  );
};

export default FavButton;
