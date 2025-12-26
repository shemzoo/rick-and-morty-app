import { createListenerMiddleware } from '@reduxjs/toolkit';
import { toggleTheme } from '../model/slice';

export const themeListenerMiddleware = createListenerMiddleware();

themeListenerMiddleware.startListening({
  actionCreator: toggleTheme,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as { theme: { theme: 'light' | 'dark' } };
    localStorage.setItem('theme', state.theme.theme);
  },
});
