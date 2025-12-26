import { useSelector } from 'react-redux';

import { MoonIcon, SunIcon } from '@/shared/assets';
import { useAppDispatch } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/utils';
import { getThemeState } from '@/features/switchTheme/model/selectors';
import { toggleTheme } from '@/features/switchTheme/model/slice';

import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const { theme } = useSelector(getThemeState);
  const isDark = theme === 'dark';

  const onToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      className={classNames(styles['theme-switcher'], {
        [styles['theme-switcher_dark']]: isDark,
      })}
      onClick={onToggle}
    >
      <span className={styles['theme-switcher__icon']}>
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
};
