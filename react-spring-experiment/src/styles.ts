import styled from 'styled-components';
import { mediaQueries } from './constants/mediaQueries';

export const Container = styled.main`
  height: 100%;
  width: 100%;
  /* max-width: 30rem; */
  margin: 0 auto;
  padding: 2rem;

  @media ${mediaQueries.tablet} {
    max-width: none;
    margin: 0;
  }

  @media ${mediaQueries.laptop} {
    max-width: 64rem;
    margin: 0 auto;
  }
`;

export const PokemonGrid = styled.section`
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media ${mediaQueries.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
