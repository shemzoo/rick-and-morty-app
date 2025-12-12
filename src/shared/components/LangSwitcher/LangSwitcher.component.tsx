import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/helpers';
import { type RootState } from '@/stores/store';

import styles from './LangSwitcher.module.scss';

export const LangSwitcher = () => {
  const { i18n, t } = useTranslation();
  const { theme } = useSelector((state: RootState) => state.theme);
  const isDark = theme === 'dark';

  const onToggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <button
      className={classNames(styles['lang-switcher'], {
        [styles['lang-switcher_dark']]: isDark,
      })}
      onClick={onToggle}
    >
      {t('lang')}
    </button>
  );
};
