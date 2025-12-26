import { type RootState } from '@/app/providers/store';

export const getCharactersFilters = (state: RootState) =>
  state.characters.filters;
