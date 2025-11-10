import { Link, useParams } from 'react-router-dom';

import { ArrowBackIcon } from '@/assets';
import { useCharacter } from '@/hooks';
import { Loader } from '@/shared/components';

import styles from './CharacterInfo.module.scss';

export const CharacterInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { character, loading, error } = useCharacter(id);

  if (loading) {
    return (
      <Loader
        size='large'
        text='Loading character card...'
      />
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!character) {
    return null;
  }

  const infoItems = [
    { label: 'Gender', value: character.gender },
    { label: 'Status', value: character.status },
    { label: 'Specie', value: character.species },
    { label: 'Origin', value: character.origin.name },
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
