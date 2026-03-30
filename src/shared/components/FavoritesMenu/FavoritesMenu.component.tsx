import { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CloseIcon, StarIcon } from '@/assets/icons';
import { useAppDispatch } from '@/hooks';
import { classNames } from '@/shared/helpers';
import { removeFavorite } from '@/stores/favorites';
import { getFavorites, getThemeState } from '@/stores/selectors';

import styles from './FavoritesMenu.module.scss';

export const FavoritesMenu = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const favorites = useSelector(getFavorites);
  const { theme } = useSelector(getThemeState);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div
      ref={containerRef}
      className={styles.favorites}
    >
      <button
        type='button'
        className={classNames(styles.favorites__trigger, {
          [styles.favorites__trigger_dark]: isDark,
          [styles.favorites__trigger_open]: isOpen
        })}
        aria-label={t('favorites.toggleList')}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <StarIcon className={styles.favorites__triggerIcon} />
        {favorites.length > 0 && (
          <span className={styles.favorites__badge}>{favorites.length}</span>
        )}
      </button>

      {isOpen && (
        <div className={styles.favorites__dropdown}>
          {favorites.length > 0 ? (
            <ul className={styles.favorites__list}>
              {favorites.map((favorite) => (
                <li
                  key={favorite.id}
                  className={styles.favorites__item}
                >
                  <Link
                    to={`/character/${favorite.id}`}
                    className={styles.favorites__link}
                    onClick={() => setIsOpen(false)}
                  >
                    {favorite.name}
                  </Link>
                  <button
                    type='button'
                    className={styles.favorites__remove}
                    aria-label={t('favorites.remove', {
                      name: favorite.name
                    })}
                    onClick={() => onRemoveFavorite(favorite.id)}
                  >
                    <CloseIcon />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.favorites__empty}>{t('favorites.empty')}</p>
          )}
        </div>
      )}
    </div>
  );
};
