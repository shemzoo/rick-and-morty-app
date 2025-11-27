import { Link, useParams } from 'react-router-dom';

import { ArrowBackIcon } from '@/assets';
import { Loader } from '@/shared/components';
import { capitalize, isErrorWithStatus } from '@/shared/helpers';
import { useGetCharacterByIdQuery } from '@/stores/api';

import styles from './CharacterInfo.module.scss';

export const CharacterInfo = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: character,
    isLoading,
    isError,
    error
  } = useGetCharacterByIdQuery(Number(id), {
    skip: !id
  });

  if (isLoading) {
    return (
      <Loader
        size='large'
        text='Loading character card...'
      />
    );
  }

  const isNotFound = isErrorWithStatus(error, 404);
  const isGenericError = isError && !isNotFound;

  if (isNotFound) {
    return (
      <div className={styles.error}>
        Character with ID {id} does not exist.
      </div>
    );
  }

  if (isGenericError || !character) {
    return (
      <div className={styles.error}>
        An unexpected error occurred. Please try again later.
      </div>
    );
  }

  const infoItems = [
    { label: 'Gender', value: character.gender },
    { label: 'Status', value: character.status },
    { label: 'Specie', value: character.species },
    { label: 'Origin', value: capitalize(character.origin.name) },
    { label: 'Type', value: character.type || 'Unknown' },
    { label: 'Location', value: character.location.name }
  ];

  return (
    <div className={styles['info-page']}>
      <Link
        to='/'
        className={styles['info-page__back-button']}
      >
        <ArrowBackIcon />

        <span>GO BACK</span>
      </Link>

      <div className={styles['info-page__content']}>
        <img
          src={character.image}
          alt={character.name}
          className={styles['info-page__image']}
        />

        <h1 className={styles['info-page__name']}>{character.name}</h1>

        <h2 className={styles['info-page__title']}>Information</h2>

        <ul className={styles['info-page__list']}>
          {infoItems.map((item) => (
            <li
              key={item.label}
              className={styles['info-page__list-item']}
            >
              <span className={styles['info-page__list-item-label']}>
                {item.label}
              </span>

              <span className={styles['info-page__list-item-value']}>
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
