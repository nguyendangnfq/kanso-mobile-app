import { instance } from '../api';

export const pokemonApi = {
  getAllPokemon() {
    const url = '/pokemon';
    return instance.get(url);
  },

  getPokemon(pokemonId: number | string) {
    const url = `/pokemon/${pokemonId}`;
    return instance.get(url);
  },

  getPokemonSpecies(pokemonId: number | string) {
    const url = `/pokemon-species/${pokemonId}`;
    return instance.get(url);
  },
};
