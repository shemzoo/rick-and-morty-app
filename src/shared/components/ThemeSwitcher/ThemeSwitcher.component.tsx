import { useSelector } from 'react-redux';

import { MoonIcon, SunIcon } from '@/assets/icons';
import { useAppDispatch } from '@/hooks';
import { classNames } from '@/shared/helpers';
import { type RootState } from '@/stores/store';
import { toggleTheme } from '@/stores/theme';

import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);
  const isDark = theme === 'dark';

  const onToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      className={classNames(styles.switcher, { [styles.dark]: isDark })}
      onClick={onToggle}
    >
      <span className={styles.icon}>{isDark ? <MoonIcon /> : <SunIcon />}</span>
    </button>
  );
};
