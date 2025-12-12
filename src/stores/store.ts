import { configureStore } from '@reduxjs/toolkit';

import { rickAndMortyApi } from './api/rickAndMortyApi';
import charactersReducer from './characters/characters.slice';
import { rtkQueryErrorLogger } from './middleware/rtkQueryErrorLogger';
import themeReducer from './theme/theme.slice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    theme: themeReducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      rickAndMortyApi.middleware,
      rtkQueryErrorLogger
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
