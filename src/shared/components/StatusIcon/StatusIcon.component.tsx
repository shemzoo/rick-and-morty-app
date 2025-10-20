import { classNames } from '@/shared/helpers/classNames';

import styles from './StatusIcon.module.scss';

export type Status = 'alive' | 'dead' | 'unknown';

interface IStatusIconProps {
  status: Status;
}

export const StatusIcon = ({ status }: IStatusIconProps) => {
  const statusClassName = classNames(
    styles.statusIcon,
    styles[`statusIcon_${status}`]
  );

  return <div className={statusClassName}></div>;
};
