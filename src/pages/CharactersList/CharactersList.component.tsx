import { Toaster } from 'react-hot-toast';

import logo from '@/assets/rick-and-morty-logo.png';
import { useCharacters } from '@/hooks';
import { Loader, type Status } from '@/shared/components';
import { classNames } from '@/shared/helpers';
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
  const { characters, loading, isFetching, filters, onFilterChange, notFound } =
    useCharacters();

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
      <ul
        className={classNames(styles.list__items, {
          [styles.list__items_fetching]: isFetching
        })}
      >
        {characters.map((character) => (
          <li key={character.id}>
            <CharacterCard character={character} />
          </li>
        ))}
      </ul>
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
