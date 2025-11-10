import { type ChangeEvent, memo } from 'react';
import type { ReactNode } from 'react';

import { classNames } from '@/shared/helpers';

import styles from './TextInput.module.scss';

export interface TextInputProps {
  variant?: 'underlined' | 'bordered';
  icon?: ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const TextInput = memo((props: TextInputProps) => {
  const { variant = 'underlined', icon, onChange, ...otherProps } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

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
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  );
});
