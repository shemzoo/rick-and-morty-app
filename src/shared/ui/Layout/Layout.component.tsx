import { Outlet } from 'react-router-dom';

import { Footer } from './ui/Footer/Footer.component';
import { Header } from './ui/Header/Header.component';

import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__main}>
        <div className={styles['layout__main-container']}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};


