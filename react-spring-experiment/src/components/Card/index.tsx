import React, { useState, useEffect, useRef, useCallback } from 'react';
import { animated, useSpring } from 'react-spring';
import { FiChevronDown } from 'react-icons/fi';

import { IPokemon } from '../../App';
import FavButton from '../FavButton';

import { Container, CardHeading } from './styles';

interface CardProps {
  pokemonData: IPokemon;
}

const Card: React.FC<CardProps> = ({ pokemonData }) => {
  const { id, name, image } = pokemonData;

  const [open, setOpen] = useState(false);
  const [triggerSize, setTriggerSize] = useState(false);
  const [contentMaxHeight, setContentMaxHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { transform, ...openAnimation } = useSpring({
    transform: `rotate(${open ? 180 : 0}deg)`,
    opacity: open ? 1 : 0,
    maxHeight: open ? `${contentMaxHeight}px` : '0px',
    config: { duration: 300 },
  });

  const sizeAnimation = useSpring({
    scale: triggerSize ? 1.1 : 1,
    config: {
      tension: 100,
      friction: 10,
    },
  });

  useEffect(() => {
    const calcContentMaxHeight = () => {
      setContentMaxHeight(ref.current!.scrollHeight);
    };

    calcContentMaxHeight();

    window.addEventListener('resize', calcContentMaxHeight);

    return () => window.removeEventListener('resize', calcContentMaxHeight);
  }, [ref, contentMaxHeight]);

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleHover = useCallback(() => {
    setTriggerSize((prev) => !prev);
  }, []);

  return (
    <Container
      style={sizeAnimation}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <FavButton />
      <img src={image} alt={name} />
      <span>{id}</span>

      <CardHeading onClick={handleClick}>
        <h2>{name}</h2>
        <animated.button type="button" style={{ transform }}>
          <FiChevronDown size={24} />
        </animated.button>
      </CardHeading>

      <animated.div ref={ref} style={{ overflow: 'hidden', ...openAnimation }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        malesuada sit amet dolor quis aliquet. Vivamus id pharetra dui. Nam
        mattis interdum viverra. Nulla a urna bibendum, euismod erat sed,
        ultrices enim. Nullam neque neque, ornare vitae nunc ornare, lobortis
        imperdiet dui. Donec convallis lacus in luctus bibendum. Integer elit
        dui, commodo a eleifend nec, iaculis ac tellus.
      </animated.div>
    </Container>
  );
};

export default Card;
