import { Link } from 'react-router-dom';

import ArrowBackIcon from '@/assets/arrow-back.svg?react';
import Loader from '@/components/Loader/Loader.component';

import styles from './CharacterInfo.module.scss';

const CharacterInfo = () => {
  return (
    <div className={styles.characterInfo}>
      <Link
        to='/'
        className={styles.characterInfo__goBack}
      >
        <ArrowBackIcon />
        <span>GO BACK</span>
      </Link>
      <Loader
        size='large'
        text='Loading character card...'
      />
    </div>
  );
};

export default CharacterInfo;
