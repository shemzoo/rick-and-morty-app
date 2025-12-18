import { useEffect, useRef } from 'react';

import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '@/hooks';
import { type IFilters } from '@/shared/types';
import { setFilters } from '@/stores/characters';

export const useSyncFiltersWithUrl = (filters: IFilters) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const isInitialSyncDone = useRef(false);

  useEffect(() => {
    if (!isInitialSyncDone.current) {
      const name = searchParams.get('name');
      const status = searchParams.get('status');
      const species = searchParams.get('species');
      const gender = searchParams.get('gender');

      if (name) dispatch(setFilters({ field: 'name', value: name }));
      if (status) dispatch(setFilters({ field: 'status', value: status }));
      if (species) dispatch(setFilters({ field: 'species', value: species }));
      if (gender) dispatch(setFilters({ field: 'gender', value: gender }));

      isInitialSyncDone.current = true;
    }
  }, [searchParams, dispatch]);

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
