import { useEffect, useRef, useState } from 'react';

import { CloseIcon, StarIcon } from '@/assets/icons';
import { classNames } from '@/shared/helpers';

import styles from './FavoriteCharacters.module.scss';

export interface IFavoriteCharacterItem {
  id: number;
  name: string;
}

export interface FavoriteCharactersLabels {
  empty?: string;
  toggleList?: string;
  remove?: (name: string) => string;
}

export interface FavoriteCharactersProps {
  favorites: IFavoriteCharacterItem[];
  isDark?: boolean;
  labels?: FavoriteCharactersLabels;
  onNavigate?: (id: number) => void;
  onRemove: (id: number) => void;
}

const defaultLabels: Required<FavoriteCharactersLabels> = {
  empty: 'No favorite characters yet.',
  toggleList: 'Open favorite characters',
  remove: (name: string) => `Remove ${name} from favorites`
};

export const FavoriteCharacters = ({
  favorites,
  isDark = false,
  labels,
  onNavigate,
  onRemove
}: FavoriteCharactersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mergedLabels = {
    ...defaultLabels,
    ...labels
  };

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

  const handleNavigate = (id: number) => {
    onNavigate?.(id);
    setIsOpen(false);
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
        aria-label={mergedLabels.toggleList}
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
                  <button
                    type='button'
                    className={styles.favorites__link}
                    onClick={() => handleNavigate(favorite.id)}
                  >
                    {favorite.name}
                  </button>
                  <button
                    type='button'
                    className={styles.favorites__remove}
                    aria-label={mergedLabels.remove(favorite.name)}
                    onClick={() => onRemove(favorite.id)}
                  >
                    <CloseIcon />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.favorites__empty}>{mergedLabels.empty}</p>
          )}
        </div>
      )}
    </div>
  );
};
