import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { type ICharacter } from '@/entities/character/model';
import { type IFilters } from './types';

interface CharactersState {
  filters: IFilters;
}

const initialFiltersState: IFilters = {
  name: '',
  status: '',
  species: '',
  gender: ''
};

export const initialState: CharactersState = {
  filters: initialFiltersState
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<{ field: keyof IFilters; value: string }>
    ) => {
      state.filters[action.payload.field] = action.payload.value;
    },
    resetFilters: (state) => {
      state.filters = initialFiltersState;
    }
  }
});

export const { setFilters, resetFilters } = charactersSlice.actions;

export default charactersSlice.reducer;
