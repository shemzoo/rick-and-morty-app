import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchCharacterById } from '@/stores/characters/characters.slice';
import { type RootState } from '@/stores/store';

export const useCharacter = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { selectedCharacter: character, loading, error } = useSelector(
    (state: RootState) => state.characters
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCharacterById(id));
    }
  }, [id, dispatch]);

  const isLoading = loading === 'pending';

  return { character, isLoading, error };
};
