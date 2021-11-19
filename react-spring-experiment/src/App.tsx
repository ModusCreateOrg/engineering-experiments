import React, { useEffect, useState } from 'react';
import { useTrail, animated } from 'react-spring';

import api from './services/api';
import { captalizeFirstLetter, formatId } from './utils';

import GlobalStyle from './styles/global';
import Card from './components/Card';
import { Container, PokemonGrid } from './styles';

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
      const formattedData = data.pokemon_entries.map(
        (pokemon: {
          entry_number: number;
          pokemon_species: { name: string };
        }) => ({
          id: formatId(pokemon.entry_number),
          name: captalizeFirstLetter(pokemon.pokemon_species.name),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.entry_number}.png`,
        })
      );

      setPokemons(formattedData);
    });
  }, []);

  const trail = useTrail(pokemons.length, {
    from: { opacity: 0, marginTop: 24 },
    to: { opacity: 1, marginTop: 0 },
    config: { duration: 100 },
  });

  return (
    <>
      <Container>
        <PokemonGrid>
          {trail.map((props, index) => (
            <animated.article style={props}>
              <Card key={pokemons[index].id} pokemonData={pokemons[index]} />
            </animated.article>
          ))}
        </PokemonGrid>
      </Container>
      <GlobalStyle />
    </>
  );
};

export default App;
