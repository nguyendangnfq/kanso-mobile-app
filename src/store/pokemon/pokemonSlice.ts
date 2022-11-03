import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { pokemonApi } from '../../services/modules/pokemon';

export const fetchAllPokemon = createAsyncThunk(
  'pokemon/fetchAllPokemon',
  async () => {
    try {
      const res = await pokemonApi.getAllPokemon();
      return res.data.results;
    } catch (error) {
      console.log(error);
    }
  },
);

export const fetchPokemonSpeciesById = createAsyncThunk(
  'pokemon/fetchSpeciesById',
  async (id: number | string) => {
    try {
      const res = await pokemonApi.getPokemonSpecies(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export type PokemonState = {
  loading: boolean;
  name: string;
  pic: string;
  types: Array<{
    id: number;
    name: string;
  }> | void;
  description: string;
};

export type AllPokemonState = {
  name: string;
  url: string;
};

export type initialTypeState = {
  originalState: PokemonState;
  allPokeState: AllPokemonState[];
};

const initialState = {
  originalState: {
    loading: false,
    name: '',
    pic: '',
    types: [],
    description: '',
  },

  allPokeState: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // fetch all Pokemon
      .addCase(fetchAllPokemon.pending, state => {
        state.originalState.loading = true;
      })

      .addCase(fetchAllPokemon.rejected, state => {
        state.originalState.loading = false;
      })

      .addCase(fetchAllPokemon.fulfilled, (state, action) => {
        state.originalState.loading = false;

        state.allPokeState = action.payload;
      })

      // fetch Specific Information of Pokemon
      .addCase(fetchPokemonSpeciesById.pending, state => {
        state.originalState.loading = true;
      })

      .addCase(fetchPokemonSpeciesById.rejected, state => {
        state.originalState.loading = false;
      });

    // .addCase(fetchPokemonSpeciesById.fulfilled, (state, action) => {
    //   const { flavor_text_entries } = action.payload;

    //   let getDescription = (entries: any) => {
    //     return entries.find((item: any) => item.language.name === 'en')
    //       .flavor_text;
    //   };

    //   state.originalState.description = getDescription(flavor_text_entries);
    // });
  },
});

export default pokemonSlice.reducer;
