import { Outlet } from "react-router-dom";

import Header from "./ui/Header/Header.component";
import Footer from "./ui/Footer/Footer.component";

import styles from "./Layout.module.scss";

const Layout = () => {
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

export default Layout;
