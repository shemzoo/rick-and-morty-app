import { Outlet } from 'react-router-dom';

import { Footer, Header } from '@/shared/components';

import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__main}>
        <div className={styles.layout__mainContainer}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};


