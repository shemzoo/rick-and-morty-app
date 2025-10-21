import logo from '@/assets/rick-and-morty-logo.png';
import { FilterPanel } from '@/widgets';

import styles from './CharactersList.module.scss';

export const CharactersList = () => {
  return (
    <>
      <div className={styles.list}>
        <img
          className={styles.list__logo}
          src={logo}
          alt='Rick and Morty Logo'
        />
      </div>
      <FilterPanel></FilterPanel>
    </>
  );
};
