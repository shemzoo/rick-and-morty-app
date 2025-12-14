import { useTranslation } from 'react-i18next';

import styles from './Footer.module.scss';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <p className={styles.footer__text}>
        {t('madeWithLoveBy')} {t('developerName')}
      </p>
    </footer>
  );
};


