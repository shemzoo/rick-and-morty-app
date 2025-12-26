import { LangSwitcher } from '@/features/switchLanguage/ui';
import { ThemeSwitcher } from '@/features/switchTheme/ui';
import { Logo } from '@/shared/ui';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Logo />
        <div className={styles.header__controls}>
          <ThemeSwitcher />
          <LangSwitcher />
        </div>
      </div>
    </header>
  );
};
