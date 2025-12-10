import { memo, useEffect, useState } from 'react';
import type { FC } from 'react';

import { Link } from 'react-router-dom';

import { CheckmarkIcon, CloseIcon, EditIcon } from '@/assets';
import { statusOptions } from '@/pages';
import { Selector, StatusIcon, TextInput } from '@/shared/components';
import { capitalize, classNames } from '@/shared/helpers';
import { type ICharacter } from '@/shared/types';

import styles from './CharacterCard.module.scss';

interface ICharacterCardProps {
  character: ICharacter;
  onUpdate: (character: ICharacter) => void;
}

export const CharacterCard: FC<ICharacterCardProps> = memo(
  ({ character, onUpdate }) => {
    const [mode, setMode] = useState<'view' | 'edit'>('view');
    const [editedCharacter, setEditedCharacter] = useState(character);

    useEffect(() => {
      setEditedCharacter(character);
    }, [character]);

    const onEdit = () => {
      setMode('edit');
    };

    const onSave = () => {
      onUpdate(editedCharacter);
      setMode('view');
    };

    const onCancel = () => {
      setEditedCharacter(character);
      setMode('view');
    };

    const handleInputChange = (
      field: keyof ICharacter,
      value: string | { name: string; url: string }
    ) => {
      setEditedCharacter((prev) => ({ ...prev, [field]: value }));
    };

    const { name, gender, species, location, status, image } = editedCharacter;

    if (mode === 'edit') {
      return (
        <div
          className={classNames(styles.card, styles.card_edit)}
          data-testid='character-card'
        >
          <div className={styles.card__icons}>
            <CheckmarkIcon
              className={classNames(styles.card__icon, styles.card__icon_save)}
              onClick={onSave}
            />
            <CloseIcon
              className={classNames(
                styles.card__icon,
                styles.card__icon_cancel
              )}
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
                onChange={(value) => handleInputChange('name', value)}
                variant='underlined'
              />
            </div>
            <div className={styles.card__row}>
              <div className={styles.card__row}>
                <p className={styles.card__label}>Gender</p>
                <p className={styles.card__value}>{gender}</p>
              </div>
            </div>
            <div className={styles.card__row}>
              <div className={styles.card__row}>
                <p className={styles.card__label}>Species</p>
                <p className={styles.card__value}>{species}</p>
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
                  value={location.name}
                  onChange={(value) =>
                    handleInputChange('location', {
                      ...location,
                      name: value
                    })
                  }
                  variant='underlined'
                />
              </div>
            </div>
            <div className={styles.card__row}>
              <p className={styles.card__label}>Status</p>
              <div
                className={classNames(
                  styles.card__value,
                  styles.card__value_interactive
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
      <div
        className={styles.card}
        data-testid='character-card'
      >
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
          <div className={styles.card__name}>
            <Link
              to={`/character/${character.id}`}
              className={styles.card__link}
            >
              {name}
            </Link>
          </div>
          <div className={styles.card__row}>
            <p className={styles.card__label}>Gender</p>
            <p className={styles.card__value}>{gender}</p>{' '}
          </div>
          <div className={styles.card__row}>
            <p className={styles.card__label}>Species</p>
            <p className={styles.card__value}>{species}</p>
          </div>
          <div className={styles.card__row}>
            <p className={styles.card__label}>Location</p>
            <p className={styles.card__value}>{location.name}</p>
          </div>
          <div className={styles.card__row}>
            <p className={styles.card__label}>Status</p>
            <div className={styles.card__status}>
              <p className={styles.card__value}>{capitalize(status)}</p>
              <StatusIcon status={status} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
