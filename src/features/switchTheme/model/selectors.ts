import { type RootState } from '@/app/providers/store';

export const getThemeState = (state: RootState) => state.theme;
