import { configureStore } from '@reduxjs/toolkit';

import { rickAndMortyApi } from '@/entities/character/api';

import charactersReducer from '@/features/filterCharacters/model/slice';
import { themeListenerMiddleware } from '@/features/switchTheme/lib/theme.middleware';
import themeReducer from '@/features/switchTheme/model/slice';
import { rtkQueryErrorLogger } from '@/shared/lib/middleware/rtkQueryErrorLogger';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    theme: themeReducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(themeListenerMiddleware.middleware)
      .concat(rickAndMortyApi.middleware, rtkQueryErrorLogger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
