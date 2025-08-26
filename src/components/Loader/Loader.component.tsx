import styles from "./Loader.module.scss";
import LoaderImage from "../../assets/loader.png";

interface LoaderProps {
  size: "large" | "small";
  text?: string;
}

const Loader = ({ size, text }: LoaderProps) => {
  const loaderClassName = `${styles.loader} ${
    styles[`loader--${size}`]
  }`;

  return (
    <div className={loaderClassName}>
      <img
        src={LoaderImage}
        alt="Loading..."
        className={styles.loader__image}
      />
      {size === "large" && text && (
        <p className={styles.loader__text}>{text}</p>
      )}
    </div>
  );
};

export default Loader;
