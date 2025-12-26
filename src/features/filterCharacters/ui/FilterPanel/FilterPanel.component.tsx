import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { SearchIcon } from '@/shared/assets';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Selector, TextInput } from '@/shared/ui';
import {
  getGenderOptions,
  getSpeciesOptions,
  getStatusOptions
} from '@/shared/lib/utils';
import { setFilters } from '../../model';
import { getCharactersFilters } from '../../model';

import styles from './FilterPanel.module.scss';

export const FilterPanel = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const filters = useSelector(getCharactersFilters);

  const statusOptions = getStatusOptions(t);
  const speciesOptions = getSpeciesOptions(t);
  const genderOptions = getGenderOptions(t);

  return (
    <div className={styles['filter-panel']}>
      <div className={styles['filter-panel__item']}>
        <TextInput
          variant='bordered'
          placeholder={t('searchPlaceholder')}
          icon={<SearchIcon />}
          value={filters.name}
          onChange={(value) => dispatch(setFilters({ field: 'name', value }))}
          data-testid='search-input'
        />
      </div>
      <div className={styles['filter-panel__item']}>
        <Selector
          size='large'
          placeholder={t('species')}
          options={speciesOptions}
          value={filters.species}
          onChange={(value) =>
            dispatch(setFilters({ field: 'species', value }))
          }
        />
      </div>
      <div className={styles['filter-panel__item']}>
        <Selector
          size='large'
          placeholder={t('gender')}
          options={genderOptions}
          value={filters.gender}
          onChange={(value) => dispatch(setFilters({ field: 'gender', value }))}
        />
      </div>
      <div className={styles['filter-panel__item']}>
        <Selector
          size='large'
          placeholder={t('status')}
          options={statusOptions}
          value={filters.status}
          onChange={(value) => dispatch(setFilters({ field: 'status', value }))}
        />
      </div>
    </div>
  );
};
