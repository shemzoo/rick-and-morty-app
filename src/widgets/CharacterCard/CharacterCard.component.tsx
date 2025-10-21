import { useEffect, useState } from 'react';
import type { FC } from 'react';

import CheckmarkIcon from '@/assets/checkmark-icon.svg?react';
import CloseIcon from '@/assets/close-icon.svg?react';
import EditIcon from '@/assets/edit-icon.svg?react';
import {
  Selector,
  type Status,
  StatusIcon,
  TextInput
} from '@/shared/components';
import { classNames } from '@/shared/helpers/classNames';

import styles from './CharacterCard.module.scss';

export interface ICharacter {
  name: string;
  gender: string;
  species: string;
  location: string;
  status: Status;
  image: string;
}

interface ICharacterCardProps {
  character: ICharacter;
}

const statusOptions: { value: Status; label: string }[] = [
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'Unknown', label: 'Unknown' }
];

export const CharacterCard: FC<ICharacterCardProps> = ({ character }) => {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [editedCharacter, setEditedCharacter] = useState(character);

  useEffect(() => {
    setEditedCharacter(character);
  }, [character]);

  const onEdit = () => {
    setMode('edit');
  };

  const onSave = () => {
    setMode('view');
  };

  const onCancel = () => {
    setEditedCharacter(character);
    setMode('view');
  };

  const handleInputChange = (field: keyof ICharacter, value: string) => {
    setEditedCharacter((prev) => ({ ...prev, [field]: value }));
  };

  const { name, gender, species, location, status, image } = editedCharacter;

  if (mode === 'edit') {
    return (
      <div className={classNames(styles.card, styles.card_edit)}>
        <div className={styles.card__icons}>
          <CheckmarkIcon
            className={classNames(styles.card__icon, styles.card__icon_save)}
            onClick={onSave}
          />
          <CloseIcon
            className={classNames(styles.card__icon, styles.card__icon_cancel)}
            onClick={onCancel}
          />
        </div>
        <div className={styles.card__image}>
          <img
            src={image}
            alt={name}
          />
        </div>
        <div className={styles.card__info}>
          <div className={styles.card__name}>
            <TextInput
              value={name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              variant='underlined'
            />
          </div>
          <div className={styles.card__row}>
            <p className={styles.card__label}>Gender</p>
            <div
              className={classNames(
                styles.card__value,
                styles.card__value_edit_input_gender
              )}
            >
              <TextInput
                value={gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                variant='underlined'
              />
            </div>
          </div>
          <div className={styles.card__row}>
            <p className={styles.card__label}>Species</p>
            <div
              className={classNames(
                styles.card__value,
                styles.card__value_edit_input_species
              )}
            >
              <TextInput
                value={species}
                onChange={(e) => handleInputChange('species', e.target.value)}
                variant='underlined'
              />
            </div>
          </div>
          <div className={styles.card__row}>
            <p className={styles.card__label}>Location</p>
            <div
              className={classNames(
                styles.card__value,
                styles.card__value_edit_input_location
              )}
            >
              <TextInput
                value={location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                variant='underlined'
              />
            </div>
          </div>
          <div className={styles.card__row}>
            <p className={styles.card__label}>Status</p>
            <div
              className={classNames(
                styles.card__value,
                styles.card__value_edit_input_status
              )}
            >
              <Selector
                value={status}
                size='small'
                options={statusOptions}
                onChange={(val) => handleInputChange('status', val)}
                placeholder='Select status'
                OptionRenderer={({ option }) => (
                  <>
                    {option?.label}

                    <StatusIcon status={option?.value} />
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.card__icons}>
        <EditIcon
          className={styles.card__icon}
          onClick={onEdit}
        />
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
            <StatusIcon status={status} />
          </div>
        </div>
      </div>
    </div>
  );
};
