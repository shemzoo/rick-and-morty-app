import logo from '@/assets/rick-and-morty-logo.png';
import { type Status } from '@/shared/components';
import { CharacterCard, FilterPanel } from '@/widgets';
import { type ICharacter } from '@/widgets';

import styles from './CharactersList.module.scss';

const character: ICharacter = {
  name: 'Rick Sanchez',
  gender: 'Male',
  species: 'Human',
  location: 'Earth',
  status: 'dead',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
};

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
  return (
    <>
      <div className={styles.list}>
        <img
          className={styles.list__logo}
          src={logo}
          alt='Rick and Morty Logo'
        />
      </div>
      <FilterPanel />
      <CharacterCard character={character} />
    </>
  );
};
