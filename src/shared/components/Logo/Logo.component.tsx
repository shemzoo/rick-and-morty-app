import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LogoDark from '@/assets/logo-dark.svg?react';
import LogoLight from '@/assets/logo-light.svg?react';
import { getThemeState } from '@/stores/selectors';

import styles from './Logo.module.scss';

export const Logo = () => {
  const { theme } = useSelector(getThemeState);
  const isDark = theme === 'dark';

  return (
    <Link to="/" className={styles.logo}>
      {isDark ? <LogoDark /> : <LogoLight />}
    </Link>
  );
};
