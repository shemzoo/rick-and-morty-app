import styles from "./Header.module.scss";
import Logo from "../Logo/Logo.component";

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
