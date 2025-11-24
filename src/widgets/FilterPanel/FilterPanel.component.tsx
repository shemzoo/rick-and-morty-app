import { useSelector } from 'react-redux';

import { SearchIcon } from '@/assets';
import { useAppDispatch } from '@/hooks';
import { genderOptions, speciesOptions, statusOptions } from '@/pages';
import { Selector, TextInput } from '@/shared/components';
import { setFilter } from '@/stores/characters';
import { type RootState } from '@/stores/store';

import styles from './FilterPanel.module.scss';

export const FilterPanel = () => {
  const dispatch = useAppDispatch();
  const filters = useSelector((state: RootState) => state.characters.filters);

  return (
    <div className={styles['filter-panel']}>
      <div className={styles['filter-panel__item']}>
        <TextInput
          variant='bordered'
          placeholder='Search by name'
          icon={<SearchIcon />}
          value={filters.name}
          onChange={(value) => dispatch(setFilter({ field: 'name', value }))}
        />
      </div>
      <div className={styles['filter-panel__item']}>
        <Selector
          size='large'
          placeholder='Species'
          options={speciesOptions}
          value={filters.species}
          onChange={(value) => dispatch(setFilter({ field: 'species', value }))}
        />
      </div>
      <div className={styles['filter-panel__item']}>
        <Selector
          size='large'
          placeholder='Gender'
          options={genderOptions}
          value={filters.gender}
          onChange={(value) => dispatch(setFilter({ field: 'gender', value }))}
        />
      </div>
      <div className={styles['filter-panel__item']}>
        <Selector
          size='large'
          placeholder='Status'
          options={statusOptions}
          value={filters.status}
          onChange={(value) => dispatch(setFilter({ field: 'status', value }))}
        />
      </div>
    </div>
  );
};
