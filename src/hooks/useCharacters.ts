import { useCallback, useEffect, useState, useTransition } from 'react';

import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import axios, { AxiosError } from 'axios';

import { type ICharacter } from '@/shared/types';
import { type RootState } from '@/stores/store';

import { useDebouncedEffect } from './useDebouncedEffect';

const DEBOUNCE_DELAY = 500;
const API_URL = 'https://rickandmortyapi.com/api/character';

export const useCharacters = () => {
  const filters = useSelector((state: RootState) => state.filters);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const hasNextPage = !!nextPage;

  const fetchCharacters = useCallback(
    async (url: string, options: { isLoadMore?: boolean } = {}) => {
      const { isLoadMore } = options;

      if (!isLoadMore) {
        setLoading(true);
        setError('');
        setNotFound(false);
      } else {
        setIsFetchingNextPage(true);
      }

      try {
        const response = await axios.get(url);
        const { info, results } = response.data;
        const transformedCharacters = results.map(
          (character: { status: string }) => ({
            ...character,
            status: character.status.toLowerCase()
          })
        );
        setCharacters((prev) =>
          isLoadMore
            ? [...prev, ...transformedCharacters]
            : transformedCharacters
        );
        setNextPage(info.next);
      } catch (err) {
        setCharacters([]);
        setNextPage(null);
        if (
          err instanceof AxiosError &&
          (err.response?.status === 404 || !err.response)
        ) {
          setNotFound(true);
        } else {
          const errorMessage = 'Не удалось загрузить список персонажей';
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
        if (isLoadMore) {
          setIsFetchingNextPage(false);
        }
      }
    },
    []
  );

  const fetchNextPage = useCallback(() => {
    if (nextPage && !isFetchingNextPage) {
      fetchCharacters(nextPage, { isLoadMore: true });
    }
  }, [nextPage, isFetchingNextPage, fetchCharacters]);

  const [debouncedName, setDebouncedName] = useState(filters.name);

  useDebouncedEffect(
    () => {
      setDebouncedName(filters.name);
    },
    [filters.name],
    DEBOUNCE_DELAY
  );

  useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedName) params.name = debouncedName;
    if (filters.status) params.status = filters.status;
    if (filters.species) params.species = filters.species;
    if (filters.gender) params.gender = filters.gender;

    const newSearchParams = new URLSearchParams(params);
    const newUrl = `${API_URL}?${newSearchParams.toString()}`;

    startTransition(() => {
      fetchCharacters(newUrl);
    });

    setSearchParams(newSearchParams, { replace: true });
  }, [
    debouncedName,
    filters.status,
    filters.species,
    filters.gender,
    fetchCharacters,
    setSearchParams
  ]);

  const updateCharacter = useCallback((updatedCharacter: ICharacter) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === updatedCharacter.id ? updatedCharacter : character
      )
    );
  }, []);

  return {
    characters,
    loading: loading || isPending,
    isFetchingNextPage,
    error,
    notFound,
    fetchNextPage,
    hasNextPage,
    updateCharacter
  };
};
