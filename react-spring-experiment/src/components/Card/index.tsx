import React, { useState, useEffect, useRef, useCallback } from 'react';
import { animated, useSpring } from 'react-spring';
import { FiChevronDown } from 'react-icons/fi';

import api from '../../services/api';
import { IPokemon } from '../../App';
import FavButton from '../FavButton';
import Loader from '../Loader';

import { Container, CardHeading, Content } from './styles';

interface CardProps {
  pokemonData: IPokemon;
}

interface PokemonDetail {
  genre: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ pokemonData }) => {
  const { id, formattedId, name, image } = pokemonData;

  const [open, setOpen] = useState(false);
  const [triggerSize, setTriggerSize] = useState(false);
  const [contentMaxHeight, setContentMaxHeight] = useState(0);
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
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

  useEffect(() => {
    if (open && !detail) {
      api.get(`pokemon-species/${id}`).then((response) => {
        const { data } = response;

        const { genus } = data.genera.find(
          (genre: { genus: string; language: { name: string } }) =>
            genre.language.name === 'en'
        );

        const { flavor_text } = data.flavor_text_entries.find(
          (entry: {
            flavor_text: string;
            language: { name: string };
            version: { name: string };
          }) =>
            entry.language.name === 'en' && entry.version.name === 'sapphire'
        );

        setTimeout(() => {
          setDetail({ genre: genus, description: flavor_text });
          setContentMaxHeight(ref.current!.scrollHeight);
        }, 3000);
      });
    }
  }, [open, detail, id]);

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setTriggerSize(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTriggerSize(false);
  }, []);

  return (
    <Container
      style={sizeAnimation}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FavButton />
      <img src={image} alt={name} />
      <span>{formattedId}</span>

      <CardHeading onClick={handleClick}>
        <h2>{name}</h2>
        <animated.button type="button" style={{ transform }}>
          <FiChevronDown size={24} />
        </animated.button>
      </CardHeading>

      <Content ref={ref} style={openAnimation}>
        {!detail ? (
          <Loader style={{ margin: '0 auto' }} />
        ) : (
          <>
            <h3>{detail.genre}</h3>
            <p>{detail.description}</p>
          </>
        )}
      </Content>
    </Container>
  );
};

export default Card;
