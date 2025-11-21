import { configureStore } from '@reduxjs/toolkit';

import charactersReducer, { initialState } from './characters/characters.slice';

const searchParams = new URLSearchParams(window.location.search);

const preloadedState = {
  characters: {
    ...initialState,
    filters: initialState.filters
  }
};

export const store = configureStore({
  reducer: {
    characters: charactersReducer
  },
  preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
