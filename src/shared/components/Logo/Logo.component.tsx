import logoImage from '@/assets/logo.png';

import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <a
      href='/'
      className={styles.logo}
    >
      <img
        src={logoImage}
        alt='Rick and Morty App Logo'
        className={styles.logo__image}
      />
    </a>
  );
};

export default Logo;
