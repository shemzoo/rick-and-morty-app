import { memo, type ChangeEvent } from 'react';
import type { ReactNode } from 'react';

import { classNames } from '@/shared/helpers/classNames';

import styles from './TextInput.module.scss';

export interface TextInputProps {
  variant?: 'underlined' | 'bordered';
  icon?: ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = memo((props: TextInputProps) => {
  const { variant = 'underlined', icon, ...otherProps } = props;

  return (
    <div
      className={classNames(
        styles['text-input'],
        styles[`text-input_${variant}`]
      )}
    >
      {icon && <div className={styles['text-input__icon']}>{icon}</div>}
      <input
        className={styles['text-input__field']}
        {...otherProps}
      />
    </div>
  );
});
