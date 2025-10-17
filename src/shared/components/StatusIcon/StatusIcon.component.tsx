import { classNames } from '@/shared/helpers/classNames';

import styles from './StatusIcon.module.scss';

export type Status = 'alive' | 'dead' | 'unknown';

interface IStatusIconProps {
  status: string;
  label?: string;
}

export const StatusIcon = ({ status, label }: IStatusIconProps) => {
  const statusClassName = classNames(
    styles.statusIcon,
    styles[`statusIcon_${status}`]
  );

  if (label) {
    return (
      <div className={styles.optionLabel}>
        {label}
        <div className={statusClassName}></div>
      </div>
    );
  }

  return <div className={statusClassName}></div>;
};
