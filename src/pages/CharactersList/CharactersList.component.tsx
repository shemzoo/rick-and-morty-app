import { Toaster } from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

import logo from '@/assets/rick-and-morty-logo.png';
import { useCharacters, useSyncFiltersWithUrl } from '@/hooks';
import { Loader } from '@/shared/components';
import { type RootState } from '@/stores/store';
import { CharacterCard, FilterPanel } from '@/widgets';

import styles from './CharactersList.module.scss';

export const statusOptions: { value: string; label: string }[] = [
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
  const {
    characters,
    isLoading,
    isFetching,
    isNotFound,
    hasNextPage,
    fetchNextPage,
    updateCharacter
  } = useCharacters();

  const filters = useSelector((state: RootState) => state.characters.filters);
  useSyncFiltersWithUrl(filters);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Loader
          size='large'
          text='Loading characters...'
        />
      );
    }

    if (isNotFound) {
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
          isFetching && (
            <div className={styles.list__loader}>
              <Loader size='small' />
            </div>
          )
        }
        style={{ overflow: 'visible' }}
        endMessage={
          !hasNextPage && characters.length > 0 ? (
            <p className={styles['list__end-message']}>
              <b>Конец списка персонажей</b>
            </p>
          ) : null
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
