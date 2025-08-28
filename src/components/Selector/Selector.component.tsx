import { useState, useRef, useEffect } from 'react';

import StatusIcon from '@/components/StatusIcon/StatusIcon.component';
import type { Status } from '@/components/StatusIcon/StatusIcon.component';

import ArrowDownIcon from '@/assets/arrow-down.svg?react';
import ArrowUpIcon from '@/assets/arrow-up.svg?react';

import styles from './Selector.module.scss';

export interface ISelectorProps {
  options: { value: string; label: string }[];
  label: string;
  size?: 'large' | 'small';
  onChange?: (value: string | undefined) => void;
  value?: string;
  withStatusIcon?: boolean;
}

const Selector = ({
  options,
  label,
  size = 'large',
  value,
  onChange,
  withStatusIcon = false
}: ISelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue);
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectorRef.current &&
      !selectorRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);
  const displayLabel = selectedOption ? selectedOption.label : label;

  const selectorClassName = `${styles.selector} ${styles[`selector_${size}`]}`;

  return (
    <div
      className={selectorClassName}
      ref={selectorRef}
    >
      <div
        className={styles.selector__header}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {displayLabel}
          {withStatusIcon && value && <StatusIcon status={value as Status} />}
        </span>
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </div>
      {isOpen && (
        <ul className={styles.selector__options}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.selector__option}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
              {withStatusIcon && <StatusIcon status={option.value as Status} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Selector;
