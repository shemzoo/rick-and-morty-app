import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { type IFilters } from '@/shared/types';

const initialState: IFilters = {
  name: '',
  status: '',
  species: '',
  gender: ''
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setSpecies: (state, action: PayloadAction<string>) => {
      state.species = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    resetFilters: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const { setName, setStatus, setSpecies, setGender, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
