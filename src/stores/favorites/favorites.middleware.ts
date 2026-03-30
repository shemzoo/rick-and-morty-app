import {
  type TypedStartListening,
  createListenerMiddleware,
  isAnyOf
} from '@reduxjs/toolkit';

import { type RootState } from '../store';
import {
  FAVORITES_STORAGE_KEY,
  removeFavorite,
  toggleFavorite
} from './favorites.slice';

export const favoritesListenerMiddleware = createListenerMiddleware();

type AppStartListening = TypedStartListening<RootState>;

const startAppListening =
  favoritesListenerMiddleware.startListening as AppStartListening;

startAppListening({
  matcher: isAnyOf(toggleFavorite, removeFavorite),
  effect: (_, listenerApi) => {
    const state = listenerApi.getState();

    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(state.favorites.items)
    );
  }
});
