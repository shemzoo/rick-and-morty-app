import { SearchIcon } from '@/assets/';
import { genderOptions, speciesOptions, statusOptions } from '@/pages';
import { Selector, TextInput } from '@/shared/components';
import { type IFilters } from '@/shared/types';

import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
  filters: IFilters;
  onFilterChange: (name: keyof IFilters, value: string) => void;
  onNameChange: (value: string) => void;
}

export const FilterPanel = ({
  filters,
  onFilterChange,
  onNameChange
}: FilterPanelProps) => {
  return (
    <div className={styles['filter-panel']}>
      <div className={styles['filter-panel__item']}>
        <TextInput
          variant='bordered'
          placeholder='Search by name'
          icon={<SearchIcon />}
          value={filters.name}
          onChange={(value) => onNameChange(value)}
        />
      </div>
      <div className={styles['filter-panel__item']}>
        <Selector
          size='large'
          placeholder='Species'
          options={speciesOptions}
          value={filters.species}
          onChange={(value) => onFilterChange('species', value)}
        />
      </div>
      <div className={styles['filter-panel__item']}>
        <Selector
          size='large'
          placeholder='Gender'
          options={genderOptions}
          value={filters.gender}
          onChange={(value) => onFilterChange('gender', value)}
        />
      </div>
      <div className={styles['filter-panel__item']}>
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
