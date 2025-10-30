import { type ComponentType, useEffect, useRef, useState } from 'react';

import { ArrowDownIcon, ArrowUpIcon } from '@/assets';
import { classNames } from '@/shared/helpers/classNames';

import styles from './Selector.module.scss';

interface Option<T> {
  value: T;
  label: string;
}

interface OptionRendererProps<T> {
  option: Option<T>;
}

const DefaultOptionRenderer = <T,>({ option }: OptionRendererProps<T>) => {
  return <span>{option.label}</span>;
};

export interface ISelectorProps<T> {
  value?: T;
  options: Option<T>[];
  placeholder: string;
  size?: 'large' | 'small';
  onChange?: (value: T) => void;
  OptionRenderer?: ComponentType<OptionRendererProps<T>>;
}

export const Selector = <T extends string | undefined>({
  options,
  placeholder,
  size = 'large',
  value,
  onChange,
  OptionRenderer = DefaultOptionRenderer
}: ISelectorProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option<T>) => {
    if (onChange) {
      onChange(option.value);
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
          placeholder
        )}

        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </div>

      {isOpen && (
        <ul className={styles.selector__options}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.selector__option}
              onClick={() => handleSelect(option)}
            >
              <OptionRenderer option={option} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
