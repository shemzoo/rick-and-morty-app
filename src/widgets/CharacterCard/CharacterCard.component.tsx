import type { FC } from 'react';

import EditIcon from '@/assets/edit-icon.svg?react';
import { type Status, StatusIcon } from '@/shared/components/';

import styles from './CharacterCard.module.scss';

export interface ICharacter {
  name: string;
  gender: string;
  species: string;
  location: string;
  status: string;
  image: string;
}

interface ICharacterCardProps {
  character: ICharacter;
  mode?: 'view' | 'edit';
}

export const CharacterCard: FC<ICharacterCardProps> = ({
  character,
  mode = 'view'
}) => {
  const { name, gender, species, location, status, image } = character;

  return (
    <div className={styles.card}>
      <div className={styles.card__icons}>
        <EditIcon className={styles.card__icon} />
      </div>
      <div className={styles.card__image}>
        <img
          src={image}
          alt={name}
        />
      </div>
      <div className={styles.card__info}>
        <div className={styles.card__name}>{name}</div>
        <div className={styles.card__row}>
          <p className={styles.card__label}>Gender</p>
          <p className={styles.card__value}>{gender}</p>
        </div>
        <div className={styles.card__row}>
          <p className={styles.card__label}>Species</p>
          <p className={styles.card__value}>{species}</p>
        </div>
        <div className={styles.card__row}>
          <p className={styles.card__label}>Location</p>
          <p className={styles.card__value}>{location}</p>
        </div>
        <div className={styles.card__row}>
          <p className={styles.card__label}>Status</p>
          <div className={styles.card__status}>
            <p className={styles.card__value}>{status}</p>
            <StatusIcon status={status.toLowerCase() as Status} />
          </div>
        </div>
      </div>
    </div>
  );
};
