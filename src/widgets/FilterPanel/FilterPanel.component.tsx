import SearchIcon from '@/assets/search.svg?react';
import { Selector } from '@/shared/components/';
import { TextInput } from '@/shared/components/';

import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
  className?: string;
}

const statusOptions = [
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'Unknown', label: 'Unknown' }
];

const speciesOptions = [
  { value: 'human', label: 'Human' },
  { value: 'alien', label: 'Alien' },
  { value: 'humanoid', label: 'Humanoid' },
  { value: 'animal', label: 'Animal' },
  { value: 'robot', label: 'Robot' },
  { value: 'cronenberg', label: 'Cronenberg' },
  { value: 'mythology', label: 'Mythology' },
  { value: 'disease', label: 'Disease' },
  { value: 'unknown', label: 'Unknown' }
];

const genderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' }
];

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
