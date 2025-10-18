import { type ComponentType, useEffect, useRef, useState } from 'react';

import ArrowDownIcon from '@/assets/arrow-down.svg?react';
import ArrowUpIcon from '@/assets/arrow-up.svg?react';
import { classNames } from '@/shared/helpers/classNames';

import styles from './Selector.module.scss';

interface Option<TValue extends string> {
  value: TValue;
  label: string;
}

interface OptionRendererProps<TValue extends string> {
  option: Option<TValue>;
}

const DefaultOptionRenderer = <TValue extends string>({
  option
}: OptionRendererProps<TValue>) => {
  return <span>{option.label}</span>;
};

export interface ISelectorProps<TValue extends string> {
  options: Option<TValue>[];
  label: string;
  size?: 'large' | 'small';
  onChange?: (value: TValue | undefined) => void;
  value?: TValue;
  OptionRenderer?: ComponentType<OptionRendererProps<TValue>>;
}

export const Selector = <TValue extends string>({
  options,
  label,
  size = 'large',
  value,
  onChange,
  OptionRenderer = DefaultOptionRenderer
}: ISelectorProps<TValue>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (selectedValue: TValue) => {
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

  const selectorClassName = classNames(
    styles.selector,
    styles[`selector_${size}`]
  );

  return (
    <div
      className={selectorClassName}
      ref={selectorRef}
    >
      <div
        className={styles.selector__header}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <OptionRenderer option={selectedOption} />
        ) : (
          <span>{label}</span>
        )}
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
              <OptionRenderer option={option} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


