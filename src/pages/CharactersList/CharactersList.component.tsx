import { useCallback, useEffect } from 'react';

import { Toaster } from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import logo from '@/assets/rick-and-morty-logo.png';
import { useAppDispatch, useDebouncedEffect } from '@/hooks';
import { Loader } from '@/shared/components';
import { type ICharacter, type Status } from '@/shared/types';
import {
  fetchCharacters,
  updateCharacter as updateCharacterAction
} from '@/stores/characters/characters.slice';
import { type RootState } from '@/stores/store';
import { CharacterCard, FilterPanel } from '@/widgets';

import styles from './CharactersList.module.scss';

const DEBOUNCE_DELAY = 500;

export const statusOptions: { value: Status; label: string }[] = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' }
];

export const speciesOptions = [
  { value: 'human', label: 'Human' },
  { value: 'alien', label: 'Alien' },
  { value: 'humanoid', label: 'Humanoid' },
  { value: 'animal', label: 'Animal' },
  { value: 'robot', label: 'Robot' },
  { value: 'cronenberg', label: 'Cronenberg' },
  { value: 'mythological creature', label: 'Mythological Creature' },
  { value: 'disease', label: 'Disease' },
  { value: 'unknown', label: 'Unknown' }
];

export const genderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' }
];

export const CharactersList = () => {
  const dispatch = useAppDispatch();
  const { characters, loading, notFound, nextPage, filters } = useSelector(
    (state: RootState) => state.characters
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const hasNextPage = !!nextPage;
  const isLoading = loading === 'pending';

  const fetchNextPage = useCallback(() => {
    if (nextPage && !isLoading) {
      dispatch(fetchCharacters({ url: nextPage, isLoadMore: true }));
    }
  }, [nextPage, isLoading, dispatch]);

  const updateCharacter = useCallback(
    (updatedCharacter: ICharacter) => {
      dispatch(updateCharacterAction(updatedCharacter));
    },
    [dispatch]
  );

  useDebouncedEffect(
    () => {
      dispatch(fetchCharacters(filters));
    },
    [filters, dispatch],
    DEBOUNCE_DELAY
  );

  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.name) params.name = filters.name;
    if (filters.status) params.status = filters.status;
    if (filters.species) params.species = filters.species;
    if (filters.gender) params.gender = filters.gender;

    const newSearchParams = new URLSearchParams(params);
    setSearchParams(newSearchParams, { replace: true });
  }, [filters, setSearchParams]);

  const renderContent = () => {
    if (isLoading && characters.length === 0) {
      return (
        <Loader
          size='large'
          text='Loading characters...'
        />
      );
    }

    if (notFound) {
      return (
        <div className={styles.list__message}>
          <p>Персонажи с такими параметрами не найдены</p>
        </div>
      );
    }

    return (
      <InfiniteScroll
        dataLength={characters.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <div className={styles.list__loader}>
            <Loader size='small' />
          </div>
        }
        style={{ overflow: 'visible' }}
        endMessage={
          <p className={styles['list__end-message']}>
            <b>Конец списка персонажей</b>
          </p>
        }
        className={styles.list__items}
      >
        <ul>
          {characters.map((character) => (
            <li key={character.id}>
              <CharacterCard
                character={character}
                onUpdate={updateCharacter}
              />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    );
  };

  return (
    <>
      <Toaster position='bottom-right' />
      <div className={styles.list}>
        <img
          className={styles.list__logo}
          src={logo}
          alt='Rick and Morty Logo'
        />
      </div>
      <FilterPanel />
      {renderContent()}
    </>
  );
};
