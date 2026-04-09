import { type RootState } from '../store';

export const getFavorites = (state: RootState) => state.favorites.items;

export const isFavoriteById = (id: number) => (state: RootState) =>
  state.favorites.items.some((item) => item.id === id);
