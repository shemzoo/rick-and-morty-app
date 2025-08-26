import React from "react";

import Header from "../Header/Header.component";
import Footer from "../Footer/Footer.component";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__main}>
        <div className={styles["layout__main-container"]}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
