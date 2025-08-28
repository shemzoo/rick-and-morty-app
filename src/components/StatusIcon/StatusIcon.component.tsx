import styles from './StatusIcon.module.scss';

export type Status = 'alive' | 'dead' | 'unknown';

interface IStatusIconProps {
  status: Status;
}

const StatusIcon = ({ status }: IStatusIconProps) => {
  const statusClassName = `${styles.statusIcon} ${styles[`statusIcon_${status}`]}`;

  return <div className={statusClassName}></div>;
};

export default StatusIcon;
