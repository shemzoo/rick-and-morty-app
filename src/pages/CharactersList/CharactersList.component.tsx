import logo from '@/assets/rick-and-morty-logo.png';
import Loader from '@/shared/components/Loader/Loader.component';

import styles from './CharactersList.module.scss';

const CharactersList = () => {
  return (
    <div className={styles.list}>
      <img
        className={styles.list__logo}
        src={logo}
        alt='Rick and Morty Logo'
      />
      <Loader
        size='large'
        text='Loading characters...'
      />
    </div>
  );
};

export default CharactersList;
