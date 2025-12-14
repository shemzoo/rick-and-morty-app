import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { ArrowBackIcon } from '@/assets';
import { Loader } from '@/shared/components';
import { capitalize, isErrorWithStatus } from '@/shared/helpers';
import { useGetCharacterByIdQuery } from '@/stores/api';

import styles from './CharacterInfo.module.scss';

export const CharacterInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const {
    data: character,
    isLoading,
    isError,
    error,
  } = useGetCharacterByIdQuery(Number(id), {
    skip: !id,
  });

  if (isLoading) {
    return <Loader size='large' text={t('loadingCharacter')} />;
  }

  const isNotFound = isErrorWithStatus(error, 404);
  const isGenericError = isError && !isNotFound;

  if (isNotFound) {
    return <div className={styles.error}>{t('characterNotFound', { id })}</div>;
  }

  if (isGenericError || !character) {
    return <div className={styles.error}>{t('genericError')}</div>;
  }

  const infoItems = [
    {
      label: t('charInfo.gender'),
      value: t(`genderOptions.${character.gender.toLowerCase()}`, {
        defaultValue: character.gender,
      }),
    },
    {
      label: t('charInfo.status'),
      value: t(`statusOptions.${character.status.toLowerCase()}`, {
        defaultValue: character.status,
      }),
    },
    {
      label: t('charInfo.specie'),
      value: t(`speciesOptions.${character.species.toLowerCase()}`, {
        defaultValue: character.species,
      }),
    },
    {
      label: t('charInfo.origin'),
      value: capitalize(character.origin.name),
    },
    {
      label: t('charInfo.type'),
      value: character.type || t('genderOptions.unknown'),
    },
    { label: t('charInfo.location'), value: character.location.name },
  ];

  return (
    <div className={styles['info-page']}>
      <Link to='/' className={styles['info-page__back-button']}>
        <ArrowBackIcon />

        <span>{t('goBack')}</span>
      </Link>

      <div className={styles['info-page__content']}>
        <img
          src={character.image}
          alt={character.name}
          className={styles['info-page__image']}
        />

        <h1 className={styles['info-page__name']}>{character.name}</h1>

        <h2 className={styles['info-page__title']}>{t('information')}</h2>

        <ul className={styles['info-page__list']}>
          {infoItems.map((item) => (
            <li key={item.label} className={styles['info-page__list-item']}>
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
