import { Link } from 'react-router-dom';

import logoImage from '@/assets/logo.png';

import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <Link
      to='/'
      className={styles.logo}
    >
      <img
        src={logoImage}
        alt='Rick and Morty App Logo'
        className={styles.logo__image}
      />
    </Link>
  );
};
