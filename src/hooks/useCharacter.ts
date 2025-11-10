import { useEffect, useState } from 'react';

import axios from 'axios';

import { type ICharacter } from '@/shared/types';

export const useCharacter = (id?: string) => {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchCharacter = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get<ICharacter>(
          `https://rickandmortyapi.com/api/character/${id}`,
          { signal: controller.signal }
        );
        setCharacter(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError('Failed to fetch character data.');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();

    return () => {
      controller.abort();
    };
  }, [id]);

  return { character, loading, error };
};
