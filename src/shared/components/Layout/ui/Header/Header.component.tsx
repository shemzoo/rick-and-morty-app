import { Logo, ThemeSwitcher } from '@/shared/components';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Logo />
        <ThemeSwitcher />
      </div>
    </header>
  );
};


