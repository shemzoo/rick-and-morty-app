import { type ChangeEvent } from 'react';

import { SearchIcon } from '@/assets/';
import { type IFilters } from '@/hooks';
import { genderOptions, speciesOptions, statusOptions } from '@/pages';
import { Selector, TextInput } from '@/shared/components';

import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
  filters: IFilters;
  onFilterChange: (name: keyof IFilters, value: string) => void;
}

export const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterPanel__item}>
        <TextInput
          variant='bordered'
          placeholder='Search by name'
          icon={<SearchIcon />}
          value={filters.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onFilterChange('name', e.target.value)
          }
        />
      </div>
      <div className={styles.filterPanel__item}>
        <Selector
          size='large'
          placeholder='Species'
          options={speciesOptions}
          value={filters.species}
          onChange={(value) => onFilterChange('species', value)}
        />
      </div>
      <div className={styles.filterPanel__item}>
        <Selector
          size='large'
          placeholder='Gender'
          options={genderOptions}
          value={filters.gender}
          onChange={(value) => onFilterChange('gender', value)}
        />
      </div>
      <div className={styles.filterPanel__item}>
        <Selector
          size='large'
          placeholder='Status'
          options={statusOptions}
          value={filters.status}
          onChange={(value) => onFilterChange('status', value)}
        />
      </div>
    </div>
  );
};
