import { memo } from 'react';
import type { ReactNode } from 'react';

import { classNames } from '@/shared/helpers/classNames';

import styles from './TextInput.module.scss';

export interface TextInputProps {
  variant?: 'form' | 'filter';
  icon?: ReactNode;
  placeholder?: string;
}

export const TextInput = memo((props: TextInputProps) => {
  const { variant = 'form', icon, ...otherProps } = props;

  const mods = {
    [styles[`text-input_${variant}`]]: variant
  };

  return (
    <div className={classNames(styles['text-input'], mods)}>
      {icon && <div className={styles['text-input__icon']}>{icon}</div>}
      <input
        className={styles['text-input__field']}
        {...otherProps}
      />
    </div>
  );
});
