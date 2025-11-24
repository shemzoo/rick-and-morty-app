import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { type IFilters } from '@/shared/types';

export const useSyncFiltersWithUrl = (filters: IFilters) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.name) params.name = filters.name;
    if (filters.status) params.status = filters.status;
    if (filters.species) params.species = filters.species;
    if (filters.gender) params.gender = filters.gender;

    const newSearchParams = new URLSearchParams(params);
    setSearchParams(newSearchParams, { replace: true });
  }, [filters, setSearchParams]);
};
