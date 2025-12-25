import { type RootState } from '../store';

export const getCharactersFilters = (state: RootState) =>
  state.characters.filters;
