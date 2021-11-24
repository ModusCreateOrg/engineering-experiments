import React from 'react';

import Card from '../../components/Card';
import { IPokemon } from '../../App';

import { Container, PokemonGrid } from './styles';

interface PokedexProps {
  pokemons: IPokemon[];
}

const Pokedex: React.FC<PokedexProps> = ({ pokemons }) => {
  return (
    <Container>
      <PokemonGrid>
        {pokemons.map((pokemon) => (
          <Card pokemonData={pokemon} key={pokemon.formattedId} />
        ))}
      </PokemonGrid>
    </Container>
  );
};

export default Pokedex;
