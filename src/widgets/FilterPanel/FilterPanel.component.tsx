import { useDispatch, useSelector } from 'react-redux';

import { SearchIcon } from '@/assets';
import { genderOptions, speciesOptions, statusOptions } from '@/pages';
import { Selector, TextInput } from '@/shared/components';
import { setGender, setName, setSpecies, setStatus } from '@/stores/filters';
import { type AppDispatch, type RootState } from '@/stores/store';

import styles from './FilterPanel.module.scss';

export const FilterPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filters);

  return (
    <div className={styles['filter-panel']}>
      <div className={styles['filter-panel__item']}>
        <TextInput
          variant='bordered'
          placeholder='Search by name'
          icon={<SearchIcon />}
          value={filters.name}
          onChange={(value) => dispatch(setName(value))}
        />
      </div>
      <div className={styles['filter-panel__item']}>
        <Selector
          size='large'
          placeholder='Species'
          options={speciesOptions}
          value={filters.species}
          onChange={(value) => dispatch(setSpecies(value))}
        />
      </div>
      <div className={styles['filter-panel__item']}>
        <Selector
          size='large'
          placeholder='Gender'
          options={genderOptions}
          value={filters.gender}
          onChange={(value) => dispatch(setGender(value))}
        />
      </div>
      <div className={styles['filter-panel__item']}>
        <Selector
          size='large'
          placeholder='Status'
          options={statusOptions}
          value={filters.status}
          onChange={(value) => dispatch(setStatus(value))}
        />
      </div>
    </div>
  );
};
