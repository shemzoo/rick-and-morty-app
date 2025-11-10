import { Toaster } from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';

import logo from '@/assets/rick-and-morty-logo.png';
import { useCharacters } from '@/hooks';
import { Loader, type Status } from '@/shared/components';
import { CharacterCard, FilterPanel } from '@/widgets';

import styles from './CharactersList.module.scss';

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
  { value: 'mythology', label: 'Mythology' },
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
    loading,
    filters,
    onFilterChange,
    notFound,
    fetchNextPage,
    hasNextPage,
    updateCharacter
  } = useCharacters();

  const renderContent = () => {
    if (loading) {
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
      <FilterPanel
        filters={filters}
        onFilterChange={onFilterChange}
      />
      {renderContent()}
    </>
  );
};
