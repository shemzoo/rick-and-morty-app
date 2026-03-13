import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { SearchIcon } from '@/assets';
import { useAppDispatch, useMediaQuery } from '@/hooks';
import { Selector, TextInput } from '@/shared/components';
import {
  getGenderOptions,
  getSpeciesOptions,
  getStatusOptions
} from '@/shared/helpers';
import { setFilters } from '@/stores/characters';
import { getCharactersFilters } from '@/stores/selectors';

import styles from './FilterPanel.module.scss';

export const FilterPanel = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const filters = useSelector(getCharactersFilters);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const statusOptions = getStatusOptions(t);
  const speciesOptions = getSpeciesOptions(t);
  const genderOptions = getGenderOptions(t);

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }, [isMobile]);

  const showAdvancedFilters = !isMobile || isExpanded;

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

      {showAdvancedFilters && (
        <>
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
              onChange={(value) =>
                dispatch(setFilters({ field: 'gender', value }))
              }
            />
          </div>
          <div className={styles['filter-panel__item']}>
            <Selector
              size='large'
              placeholder={t('status')}
              options={statusOptions}
              value={filters.status}
              onChange={(value) =>
                dispatch(setFilters({ field: 'status', value }))
              }
            />
          </div>
        </>
      )}

      {isMobile && (
        <button
          type='button'
          className={styles['filter-panel__toggle']}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <span
            className={styles['filter-panel__toggle-icon']}
            aria-hidden='true'
          >
            <span />
            <span />
          </span>
          <span className={styles['filter-panel__toggle-text']}>
            {isExpanded ? 'LESS FILTERS' : 'MORE FILTERS'}
          </span>
        </button>
      )}
    </div>
  );
};
