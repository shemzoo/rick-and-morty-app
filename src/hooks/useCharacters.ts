import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { type ICharacter } from '@/widgets';
import { useDebouncedEffect } from './useDebouncedEffect';

export interface IFilters {
  name: string;
  status: string;
  species: string;
  gender: string;
}

const DEBOUNCE_DELAY = 500;

export const useCharacters = (filters: IFilters) => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  useDebouncedEffect(
    () => {
      const abortController = new AbortController();

      const fetchCharacters = async () => {
        try {
          setIsFetching(true);
          setError('');

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
          setCharacters([]); // Clear characters on error
          setError('Не удалось загрузить список персонажей');
          toast.error('Персонажи с такими параметрами не найдены');
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

  return { characters, loading, isFetching, error };
};
