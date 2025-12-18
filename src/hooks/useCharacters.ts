import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { useDebounce } from '@/hooks';
import { isErrorWithStatus } from '@/shared/helpers';
import { type ICharacter } from '@/shared/types';
import { useGetCharactersQuery } from '@/stores/api';
import { getCharactersFilters } from '@/stores/selectors';

export const useCharacters = () => {
  const filters = useSelector(getCharactersFilters);

  const [page, setPage] = useState(1);
  const [allCharacters, setAllCharacters] = useState<ICharacter[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const debouncedFilters = useDebounce(filters, 500);

  const {
    data,
    isLoading: isQueryLoading,
    isFetching,
    isError,
    error
  } = useGetCharactersQuery({
    ...debouncedFilters,
    page
  });

  useEffect(() => {
    setPage(1);
    setAllCharacters([]);
  }, [debouncedFilters]);

  useEffect(() => {
    if (data) {
      setAllCharacters((prev) =>
        page === 1 ? data.results : [...prev, ...data.results]
      );
      setHasNextPage(data.info.next !== null);
    }
  }, [data]);

  const fetchNextPage = () => {
    if (hasNextPage && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleUpdateCharacter = (character: ICharacter) => {
    setAllCharacters((prev) =>
      prev.map((char) => (char.id === character.id ? character : char))
    );
  };

  const isLoading = isQueryLoading && allCharacters.length === 0;

  const isNotFound = isErrorWithStatus(error, 404);

  const isGenericError = isError && !isNotFound;

  return {
    characters: allCharacters,
    isLoading,
    isFetching,
    isNotFound,
    isGenericError,
    hasNextPage,
    fetchNextPage,
    updateCharacter: handleUpdateCharacter
  };
};
