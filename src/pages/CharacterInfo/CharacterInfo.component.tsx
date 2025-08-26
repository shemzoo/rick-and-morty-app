import { Link } from "react-router-dom";

import styles from "./CharacterInfo.module.scss";
import ArrowBack from "../../assets/arrow-back.svg";

import Loader from "../../components/Loader/Loader.component";

const CharacterInfo = () => {
  return (
    <div className={styles["character-info"]}>
      <Link
        to="/"
        className={styles["character-info__go-back"]}
      >
        <img
          src={ArrowBack}
          alt="Go back"
          className={styles["character-info__go-back-icon"]}
        />
        <span>GO BACK</span>
      </Link>
      <Loader
        size={"large"}
        text="Loading character card..."
      />
    </div>
  );
};

export default CharacterInfo;
