import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { type ICharacter, type IFilters } from '@/shared/types';

interface CharactersState {
  selectedCharacter: ICharacter | null;
  filters: IFilters;
}

const initialFiltersState: IFilters = {
  name: '',
  status: '',
  species: '',
  gender: ''
};

export const initialState: CharactersState = {
  selectedCharacter: null,
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
    },
    updateSelectedCharacter: (state, action: PayloadAction<ICharacter>) => {
      if (state.selectedCharacter?.id === action.payload.id) {
        state.selectedCharacter = action.payload;
      }
    }
  }
});

export const { setFilters, resetFilters, updateSelectedCharacter } =
  charactersSlice.actions;

export default charactersSlice.reducer;
