import { useCallback } from 'react';

import { useSelector } from 'react-redux';

import { type ICharacter } from '@/shared/types';
import {
  fetchCharacters,
  updateCharacter as updateCharacterAction
} from '@/stores/characters/characters.slice';
import { type RootState } from '@/stores/store';

import { useAppDispatch } from './useAppDispatch';
import { useDebouncedEffect } from './useDebouncedEffect';

const DEBOUNCE_DELAY = 500;

export const useCharacters = () => {
  const dispatch = useAppDispatch();
  const { characters, loading, notFound, nextPage, filters } = useSelector(
    (state: RootState) => state.characters
  );

  const hasNextPage = !!nextPage;
  const isLoading = loading === 'pending';

  const fetchNextPage = useCallback(() => {
    if (nextPage && !isLoading) {
      dispatch(fetchCharacters({ url: nextPage, isLoadMore: true }));
    }
  }, [nextPage, isLoading, dispatch]);

  const updateCharacter = useCallback(
    (updatedCharacter: ICharacter) => {
      dispatch(updateCharacterAction(updatedCharacter));
    },
    [dispatch]
  );

  useDebouncedEffect(
    () => {
      dispatch(fetchCharacters(filters));
    },
    [filters, dispatch],
    DEBOUNCE_DELAY
  );

  return {
    characters,
    isLoading,
    notFound,
    hasNextPage,
    fetchNextPage,
    updateCharacter,
    filters
  };
};
