import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { type ICharacter } from '@/shared/types';

export interface IFavoriteCharacter {
  id: number;
  name: string;
}

interface FavoritesState {
  items: IFavoriteCharacter[];
}

const FAVORITES_STORAGE_KEY = 'favorites';

const getInitialFavorites = (): IFavoriteCharacter[] => {
  const rawFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!rawFavorites) {
    return [];
  }

  try {
    return JSON.parse(rawFavorites) as IFavoriteCharacter[];
  } catch {
    return [];
  }
};

const initialState: FavoritesState = {
  items: getInitialFavorites()
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<ICharacter>) => {
      const favoriteCharacter = action.payload;
      const existingIndex = state.items.findIndex(
        ({ id }) => id === favoriteCharacter.id
      );

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
        return;
      }

      state.items.unshift({
        id: favoriteCharacter.id,
        name: favoriteCharacter.name
      });
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(({ id }) => id !== action.payload);
    }
  }
});

export const { toggleFavorite, removeFavorite } = favoritesSlice.actions;

export { FAVORITES_STORAGE_KEY };

export default favoritesSlice.reducer;
