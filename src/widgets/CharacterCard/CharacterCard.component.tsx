import { memo, useEffect, useState } from 'react';
import type { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { CheckmarkIcon, CloseIcon, EditIcon } from '@/assets';
import { Selector, StatusIcon, TextInput } from '@/shared/components';
import { classNames } from '@/shared/helpers';
import { type ICharacter } from '@/shared/types';

import styles from './CharacterCard.module.scss';

interface ICharacterCardProps {
  character: ICharacter;
  onUpdate: (character: ICharacter) => void;
}

export const CharacterCard: FC<ICharacterCardProps> = memo(
  ({ character, onUpdate }) => {
    const { t } = useTranslation();
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

    const statusOptions: { value: string; label: string }[] = [
      { value: 'alive', label: t('statusOptions.alive') },
      { value: 'dead', label: t('statusOptions.dead') },
      { value: 'unknown', label: t('statusOptions.unknown') }
    ];

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
                <p className={styles.card__label}>{t('charCard.gender')}</p>
                <p className={styles.card__value}>
                  {t(`genderOptions.${gender.toLowerCase()}`, {
                    defaultValue: gender,
                  })}
                </p>
              </div>
            </div>
            <div className={styles.card__row}>
              <div className={styles.card__row}>
                <p className={styles.card__label}>{t('charCard.species')}</p>
                <p className={styles.card__value}>
                  {t(`speciesOptions.${species.toLowerCase()}`, {
                    defaultValue: species,
                  })}
                </p>
              </div>
            </div>
            <div className={styles.card__row}>
              <p className={styles.card__label}>{t('charCard.location')}</p>
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
                      name: value,
                    })
                  }
                  variant='underlined'
                />
              </div>
            </div>
            <div className={styles.card__row}>
              <p className={styles.card__label}>{t('charCard.status')}</p>
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
                  placeholder={t('charCard.selectStatus')}
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
            <p className={styles.card__label}>{t('charCard.gender')}</p>
            <p className={styles.card__value}>
              {t(`genderOptions.${gender.toLowerCase()}`, {
                defaultValue: gender
              })}
            </p>
          </div>
          <div className={styles.card__row}>
            <p className={styles.card__label}>{t('charCard.species')}</p>
            <p className={styles.card__value}>
              {t(`speciesOptions.${species.toLowerCase()}`, {
                defaultValue: species
              })}
            </p>
          </div>
          <div className={styles.card__row}>
            <p className={styles.card__label}>{t('charCard.location')}</p>
            <p className={styles.card__value}>{location.name}</p>
          </div>
          <div className={styles.card__row}>
            <p className={styles.card__label}>{t('charCard.status')}</p>
            <div className={styles.card__status}>
              <p className={styles.card__value}>
                {t(`statusOptions.${status.toLowerCase()}`, {
                  defaultValue: status
                })}
              </p>
              <StatusIcon status={status} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
