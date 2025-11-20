import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from './filters/filters.slice';

const searchParams = new URLSearchParams(window.location.search);

const preloadedState = {
  filters: {
    name: searchParams.get('name') || '',
    status: searchParams.get('status') || '',
    species: searchParams.get('species') || '',
    gender: searchParams.get('gender') || ''
  }
};

export const store = configureStore({
  reducer: {
    filters: filtersReducer
  },
  preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
