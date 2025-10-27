import SearchIcon from '@/assets/search.svg?react';
import { genderOptions, speciesOptions, statusOptions } from '@/pages';
import { Selector, TextInput } from '@/shared/components';

import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
  className?: string;
}

export const FilterPanel = (props: FilterPanelProps) => {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterPanel__item}>
        <TextInput
          variant='bordered'
          placeholder='Search by name'
          icon={<SearchIcon />}
        />
      </div>
      <div className={styles.filterPanel__item}>
        <Selector
          size='large'
          placeholder='Species'
          options={speciesOptions}
        />
      </div>
      <div className={styles.filterPanel__item}>
        <Selector
          size='large'
          placeholder='Gender'
          options={genderOptions}
        />
      </div>
      <div className={styles.filterPanel__item}>
        <Selector
          size='large'
          placeholder='Status'
          options={statusOptions}
        />
      </div>
    </div>
  );
};
