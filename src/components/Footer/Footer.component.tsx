import styles from "./Footer.module.scss";

const developerName: string = "Shemzoo";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__text}>
        Made with love by {developerName}
      </p>
    </footer>
  );
};

export default Footer;
