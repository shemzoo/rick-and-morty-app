import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import axios from 'axios';

import logo from '@/assets/rick-and-morty-logo.png';
import { Loader, type Status } from '@/shared/components';
import { CharacterCard, FilterPanel, type ICharacter } from '@/widgets';

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
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const abortController = new AbortController();

    const fetchCharacters = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          'https://rickandmortyapi.com/api/character',
          { signal: abortController.signal }
        );

        const transformedCharacters = response.data.results.map(
          (character: { status: string }) => ({
            ...character,
            status: character.status.toLowerCase()
          })
        );

        setCharacters(transformedCharacters);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
          return;
        }
        setError('Не удалось загрузить список персонажей');
        toast.error('Не удалось загрузить список персонажей');
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();

    return () => {
      abortController.abort();
    };
  }, []);

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
      {loading ? (
        <Loader
          size='large'
          text='Loading characters...'
        />
      ) : (
        <div className={styles.list__items}>
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
            />
          ))}
        </div>
      )}
    </>
  );
};
