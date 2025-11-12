import { classNames } from '@/shared/helpers/classNames';

import { type Status } from '@/shared/types';

import styles from './StatusIcon.module.scss';


interface IStatusIconProps {
  status: Status;
}

export const StatusIcon = ({ status }: IStatusIconProps) => {
  const statusClassName = classNames(
    styles['status-icon'],
    styles[`status-icon_${status}`]
  );

  return <div className={statusClassName}></div>;
};
