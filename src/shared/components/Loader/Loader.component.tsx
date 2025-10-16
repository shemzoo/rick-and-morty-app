import LoaderImage from '@/assets/loader.png';
import { classNames } from '@/shared/helpers/classNames';

import styles from './Loader.module.scss';

type LoaderProps =
  | { size: 'large'; text?: string }
  | { size: 'small'; text?: never };

export const Loader = ({ size, text }: LoaderProps) => {
  const loaderClassName = classNames(styles.loader, styles[`loader_${size}`]);

  return (
    <div className={loaderClassName}>
      <img
        src={LoaderImage}
        alt='Loading...'
        className={styles.loader__image}
      />
      {size === 'large' && text && (
        <p className={styles.loader__text}>{text}</p>
      )}
    </div>
  );
};


