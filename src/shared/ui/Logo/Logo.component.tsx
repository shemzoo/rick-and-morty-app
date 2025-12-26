import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getThemeState } from '@/features/switchTheme/model/selectors';
import LogoDark from '@/shared/assets/logo-dark.svg?react';
import LogoLight from '@/shared/assets/logo-light.svg?react';

import styles from './Logo.module.scss';

export const Logo = () => {
  const { theme } = useSelector(getThemeState);
  const isDark = theme === 'dark';

  return (
    <Link
      to='/'
      className={styles.logo}
    >
      {isDark ? <LogoDark /> : <LogoLight />}
    </Link>
  );
};
