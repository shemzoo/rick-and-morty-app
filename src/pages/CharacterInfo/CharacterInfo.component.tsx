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

interface StatusOptionRendererProps {
  option: { value: Status; label: string };
}

const StatusOptionRenderer = ({ option }: StatusOptionRendererProps) => {
  return (
    <StatusIcon
      status={option.value}
      label={option.label}
    />
  );
};

export const CharacterInfo = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const [status, setStatus] = useState<Status | undefined>();

  const character: ICharacter = {
    name: 'Rick Sanchez',
    gender: 'Male',
    species: 'Human',
    location: 'Earth',
    status: 'Dead',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  };

  const options = [
    { value: '1', label: 'Human' },
    { value: '2', label: 'Alien' },
    { value: '3', label: 'Humanoid' },
    { value: '4', label: 'Animal' },
    { value: '5', label: 'Robot' }
  ];

  const statusOptions: { value: Status; label: string }[] = [
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' }
  ];

  return (
    <div className={styles.characterInfo}>
      <Link
        to='/'
        className={styles.characterInfo__goBack}
      >
        <ArrowBackIcon />
        <span>GO BACK</span>
      </Link>
      <Loader
        size='large'
        text='Loading character card...'
      />
      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        <CharacterCard
          character={character}
          mode='view'
        />
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        <Selector
          options={options}
          label='Species'
          value={selectedValue}
          onChange={setSelectedValue}
        />
        <Selector
          options={statusOptions}
          label='Status'
          value={status}
          onChange={setStatus}
          size='small'
          OptionRenderer={StatusOptionRenderer}
        />
        <TextInput
          variant='bordered'
          placeholder='Filter by name...'
          icon={<SearchIcon />}
        ></TextInput>
        <TextInput variant='underlined'></TextInput>
      </div>
    </div>
  );
};
