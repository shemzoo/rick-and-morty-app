import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

import logo from '@/shared/assets/rick-and-morty-logo.png';
import { useCharacters } from '@/entities/character/model/hooks';
import { useSyncFiltersWithUrl } from '@/features/filterCharacters/model/hooks';
import { Loader } from '@/shared/ui';
import { getCharactersFilters } from '@/features/filterCharacters/model';
import { CharacterCard } from '@/entities/character/ui';
import { FilterPanel } from '@/features/filterCharacters/ui';

import styles from './CharactersList.module.scss';

export const CharactersList = () => {
  const { t } = useTranslation();
  const {
    characters,
    isLoading,
    isFetching,
    isNotFound,
    hasNextPage,
    fetchNextPage,
    updateCharacter
  } = useCharacters();

  const filters = useSelector(getCharactersFilters);
  useSyncFiltersWithUrl(filters);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Loader
          size='large'
          text={t('loadingCharacters')}
        />
      );
    }

    if (isNotFound) {
      return (
        <div className={styles.list__message}>
          <p>{t('charactersNotFound')}</p>
        </div>
      );
    }

    return (
      <InfiniteScroll
        dataLength={characters.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          isFetching && (
            <div className={styles.list__loader}>
              <Loader size='small' />
            </div>
          )
        }
        style={{ overflow: 'visible' }}
        endMessage={
          !hasNextPage && characters.length > 0 ? (
            <p className={styles['list__end-message']}>
              <b>{t('endOfList')}</b>
            </p>
          ) : null
        }
        className={styles.list__items}
      >
        <ul>
          {characters.map((character) => (
            <li key={character.id}>
              <CharacterCard
                character={character}
                onUpdate={updateCharacter}
              />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    );
  };

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
      {renderContent()}
    </>
  );
};
