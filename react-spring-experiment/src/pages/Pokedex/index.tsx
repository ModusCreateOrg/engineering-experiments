import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import { captalizeFirstLetter, formatId } from '../../utils';

import Card from '../../components/Card';
import { Container, PokemonGrid } from './styles';

export interface IPokemon {
  id: string;
  name: string;
  image: string;
}

const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  useEffect(() => {
    api.get('pokedex/2/').then((response) => {
      const { data } = response;
      const formattedData = data.pokemon_entries
        .slice(0, 6)
        .map(
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

  return (
    <Container>
      {pokemons.length ? <p>Tem pokemon</p> : <p>Não tem pokemon</p>}
      <PokemonGrid>
        {pokemons.map((pokemon) => (
          <Card pokemonData={pokemon} key={pokemon.id} />
        ))}
      </PokemonGrid>
    </Container>
  );
};

export default Pokedex;
