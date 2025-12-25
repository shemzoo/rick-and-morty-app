import {
  createListenerMiddleware,
  isAnyOf,
  type TypedStartListening,
} from '@reduxjs/toolkit';

import { type RootState } from '../store';
import { toggleTheme } from './theme.slice';

export const themeListenerMiddleware = createListenerMiddleware();

type AppStartListening = TypedStartListening<RootState>;

const startAppListening =
  themeListenerMiddleware.startListening as AppStartListening;

startAppListening({
  matcher: isAnyOf(toggleTheme),
  effect: (_, listenerApi) => {
    const state = listenerApi.getState();
    localStorage.setItem('theme', state.theme.theme);
  },
});
