import React, { Suspense } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks';
import { removeFavorite } from '@/stores/favorites';
import { getFavorites, getThemeState } from '@/stores/selectors';
import { type IFavoriteCharacterItem } from '@/widgets/FavoriteCharacters/FavoriteCharacters.component';

const FavoriteCharactersView = React.lazy(
  () => import('remote_app/FavoriteCharacters')
);

const getSafeLabel = (value: unknown, fallback: string) =>
  typeof value === 'string' ? value : fallback;

export const FavoriteCharacters = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(getFavorites) as IFavoriteCharacterItem[];
  const { theme } = useSelector(getThemeState);
  const labels = {
    empty: getSafeLabel(t('favorites.empty'), 'No favorite characters yet.'),
    toggleList: getSafeLabel(
      t('favorites.toggleList'),
      'Open favorite characters'
    )
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FavoriteCharactersView
        favorites={favorites}
        isDark={theme === 'dark'}
        labels={labels}
        onNavigate={(id: number) => navigate(`/character/${id}`)}
        onRemove={(id: number) => dispatch(removeFavorite(id))}
      />
    </Suspense>
  );
};
