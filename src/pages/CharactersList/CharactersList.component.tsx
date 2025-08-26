import styles from "./CharactersList.module.scss";
import logo from "../../assets/rick-and-morty-logo.png";

import Loader from "../../components/Loader/Loader.component";

const CharactersList = () => {
  return (
    <div className={styles.list}>
      <img
        className={styles.logo}
        src={logo}
        alt="Rick and Morty Logo"
      />
      <Loader
        size={"large"}
        text="Loading characters..."
      />
    </div>
  );
};

export default CharactersList;
