import { classNames } from '@/shared/helpers/classNames';

import styles from './StatusIcon.module.scss';

interface IStatusIconProps {
  status: string;
}

export const StatusIcon = ({ status }: IStatusIconProps) => {
  const statusClassName = classNames(
    styles['status-icon'],
    styles[`status-icon_${status.toLowerCase()}`]
  );

  return <div className={statusClassName}></div>;
};
