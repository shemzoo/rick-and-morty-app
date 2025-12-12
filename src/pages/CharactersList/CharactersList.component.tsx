import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

import logo from '@/assets/rick-and-morty-logo.png';
import { useCharacters, useSyncFiltersWithUrl } from '@/hooks';
import { Loader } from '@/shared/components';
import { type RootState } from '@/stores/store';
import { CharacterCard, FilterPanel } from '@/widgets';

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

  const filters = useSelector((state: RootState) => state.characters.filters);
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
      <Toaster position='bottom-right' />
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
