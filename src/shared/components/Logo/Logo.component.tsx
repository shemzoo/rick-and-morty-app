import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LogoDark from '@/assets/logo-dark.svg?react';
import LogoLight from '@/assets/logo-light.svg?react';
import { type RootState } from '@/stores/store';

import styles from './Logo.module.scss';

export const Logo = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const isDark = theme === 'dark';

  return (
    <Link to="/" className={styles.logo}>
      {isDark ? <LogoDark /> : <LogoLight />}
    </Link>
  );
};
