import Logo from '@/shared/components/Logo/Logo.component';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Logo />
      </div>
    </header>
  );
};

export default Header;
