import { useCallback, useEffect, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

import axios, { AxiosError } from 'axios';

import { type ICharacter, type IFilters } from '@/shared/types';

import { useDebouncedEffect } from './useDebouncedEffect';

const DEBOUNCE_DELAY = 500;
const API_URL = 'https://rickandmortyapi.com/api/character';

export const useCharacters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState<IFilters>({
    name: searchParams.get('name') || '',
    status: searchParams.get('status') || '',
    species: searchParams.get('species') || '',
    gender: searchParams.get('gender') || ''
  });

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const onNameChange = (value: string) => {
    startTransition(() => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        name: value
      }));
    });
  };

  const onFilterChange = (filterName: keyof IFilters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const hasNextPage = !!nextPage;

  const fetchCharacters = useCallback(
    async (
      url: string,
      options: { isLoadMore?: boolean; isTransition?: boolean } = {}
    ) => {
      const { isLoadMore, isTransition } = options;

      if (!isLoadMore && !isTransition) {
        setLoading(true);
      }
      if (!isLoadMore) {
        setError('');
        setNotFound(false);
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
        if (!isLoadMore && !isTransition) {
          setLoading(false);
        }
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

  useEffect(() => {
    const params: { [key: string]: string } = {};
    if (filters.name) params.name = filters.name;
    if (filters.status) params.status = filters.status;
    if (filters.gender) params.gender = filters.gender;
    if (filters.species) params.species = filters.species;

    const searchParams = new URLSearchParams(params);
    const newUrl = `${API_URL}?${searchParams.toString()}`;

    fetchCharacters(newUrl, { isTransition: true });

    setSearchParams(params, { replace: true });
  }, [filters.name]);

  useDebouncedEffect(
    () => {
      const params: { [key: string]: string } = {};
      if (filters.name) params.name = filters.name;
      if (filters.status) params.status = filters.status;
      if (filters.species) params.species = filters.species;
      if (filters.gender) params.gender = filters.gender;

      const searchParams = new URLSearchParams(params);
      const newUrl = `${API_URL}?${searchParams.toString()}`;

      fetchCharacters(newUrl);

      setSearchParams(params, { replace: true });
    },
    [filters.status, filters.species, filters.gender],
    DEBOUNCE_DELAY
  );

  const updateCharacter = useCallback((updatedCharacter: ICharacter) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === updatedCharacter.id ? updatedCharacter : character
      )
    );
  }, []);

  return {
    characters,
    loading: loading && !isPending,
    isPending,
    isFetchingNextPage,
    error,
    filters,
    onNameChange,
    onFilterChange,
    notFound,
    fetchNextPage,
    hasNextPage,
    updateCharacter
  };
};
