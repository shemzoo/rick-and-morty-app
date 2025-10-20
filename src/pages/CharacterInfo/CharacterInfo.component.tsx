import { useState } from 'react';

import { Link } from 'react-router-dom';

import ArrowBackIcon from '@/assets/arrow-back.svg?react';
import SearchIcon from '@/assets/search.svg?react';
import {
  Loader,
  Selector,
  type Status,
  StatusIcon,
  TextInput
} from '@/shared/components';
import { CharacterCard, type ICharacter } from '@/widgets';

import styles from './CharacterInfo.module.scss';

const character: ICharacter = {
  name: 'Rick Sanchez',
  gender: 'Male',
  species: 'Human',
  location: 'Earth',
  status: 'Dead',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
};

const options = [
  { value: 'human', label: 'Human' },
  { value: 'alien', label: 'Alien' },
  { value: 'humanoid', label: 'Humanoid' },
  { value: 'animal', label: 'Animal' },
  { value: 'robot', label: 'Robot' }
];

const statusOptions: { value: Status; label: string }[] = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' }
];

export const CharacterInfo = () => {
  const [species, setSpecies] = useState<string | undefined>();
  const [status, setStatus] = useState<Status | undefined>();

  return (
    <div className={styles.characterInfo}>
      <Link
        to='/'
        className={styles.characterInfo__goBack}
      >
        <ArrowBackIcon />
        <span>GO BACK</span>
      </Link>

      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        <CharacterCard
          character={character}
          mode='view'
        />
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        <Selector
          value={status}
          options={statusOptions}
          onChange={setStatus}
          size='small'
          placeholder='Select status'
          OptionRenderer={({ option }) => (
            <>
              {option?.label}

              <StatusIcon status={option?.value} />
            </>
          )}
        />

        <Selector
          value={species}
          options={options}
          placeholder='Species'
          onChange={setSpecies}
        />

        <TextInput
          variant='bordered'
          placeholder='Filter by name...'
          icon={<SearchIcon />}
        />

        <TextInput variant='underlined' />
      </div>
    </div>
  );
};
