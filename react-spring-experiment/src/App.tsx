import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { Route, Routes as ReactRoutes, useLocation } from 'react-router-dom';

import api from './services/api';
import { captalizeFirstLetter, formatId } from './utils';

import Start from './pages/Start';
import Pokedex from './pages/Pokedex';

export interface IPokemon {
  id: string;
  name: string;
  image: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  useEffect(() => {
    api.get('pokedex/2/').then((response) => {
      const { data } = response;
      const formattedData = data.pokemon_entries
        .slice(0, 9)
        .map(
          (pokemon: {
            entry_number: number;
            pokemon_species: { name: string };
          }) => {
            const img = new Image();
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.entry_number}.png`;

            return {
              id: formatId(pokemon.entry_number),
              name: captalizeFirstLetter(pokemon.pokemon_species.name),
              image: img.src,
            };
          }
        );

      setPokemons(formattedData);
    });
  }, []);

  const location = useLocation();
  const transitions = useTransition(location, {
    keys: (location) => location.pathname,
    from: { opacity: 0, transform: 'translate(100%,0)' },
    enter: { opacity: 1, transform: 'translate(0%,0)' },
    leave: { opacity: 0, transform: 'translate(-50%,0)' },
  });

  return transitions((props, item) => (
    <animated.div style={props}>
      <ReactRoutes location={item}>
        <Route path="/" element={<Start />} />
        <Route path="/pokedex" element={<Pokedex pokemons={pokemons} />} />
      </ReactRoutes>
    </animated.div>
  ));
};

export default App;
