import { Link } from 'react-router-dom';

import { ArrowBackIcon } from '@/assets';

import styles from './CharacterInfo.module.scss';

export const CharacterInfo = () => {
  return (
    <div className={styles.characterInfo}>
      <Link
        to='/'
        className={styles.characterInfo__goBack}
      >
        <ArrowBackIcon />
        <span>GO BACK</span>
      </Link>
    </div>
  );
};
