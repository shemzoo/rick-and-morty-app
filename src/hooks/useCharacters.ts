import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

import axios from 'axios';

import { type ICharacter } from '@/widgets';

import { useDebouncedEffect } from './useDebouncedEffect';

export interface IFilters {
  name: string;
  status: string;
  species: string;
  gender: string;
}

const DEBOUNCE_DELAY = 500;

export const useCharacters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<IFilters>({
    name: searchParams.get('name') || '',
    status: searchParams.get('status') || '',
    species: searchParams.get('species') || '',
    gender: searchParams.get('gender') || ''
  });
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  const onFilterChange = (filterName: keyof IFilters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  useEffect(() => {
    const params: { [key: string]: string } = {};
    if (filters.name) params.name = filters.name;
    if (filters.status) params.status = filters.status;
    if (filters.species) params.species = filters.species;
    if (filters.gender) params.gender = filters.gender;
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  useDebouncedEffect(
    () => {
      const abortController = new AbortController();

      const fetchCharacters = async () => {
        try {
          setIsFetching(true);
          setError('');
          setNotFound(false);

          const params = new URLSearchParams();
          if (filters.name) params.append('name', filters.name);
          if (filters.status) params.append('status', filters.status);
          if (filters.species) params.append('species', filters.species);
          if (filters.gender) params.append('gender', filters.gender);

          const response = await axios.get(
            `https://rickandmortyapi.com/api/character?${params.toString()}`,
            { signal: abortController.signal }
          );

          const transformedCharacters = response.data.results.map(
            (character: { status: string }) => ({
              ...character,
              status: character.status.toLowerCase()
            })
          );

          setCharacters(transformedCharacters);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
            return;
          }
          setCharacters([]);
          if (axios.isAxiosError(error)) {
            setNotFound(true);
          } else {
            const errorMessage = 'Не удалось загрузить список персонажей';
            setError(errorMessage);
            toast.error(errorMessage);
          }
        } finally {
          setLoading(false);
          setIsFetching(false);
        }
      };

      fetchCharacters();

      return () => {
        abortController.abort();
      };
    },
    [filters],
    DEBOUNCE_DELAY
  );

  return {
    characters,
    loading,
    isFetching,
    error,
    filters,
    onFilterChange,
    notFound
  };
};
