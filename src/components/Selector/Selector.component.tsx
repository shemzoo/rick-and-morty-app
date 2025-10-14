import { type ComponentType, useEffect, useRef, useState } from 'react';

import ArrowDownIcon from '@/assets/arrow-down.svg?react';
import ArrowUpIcon from '@/assets/arrow-up.svg?react';
import { classNames } from '@/utils/classNames';

import styles from './Selector.module.scss';

interface Option {
  value: string;
  label: string;
}

interface OptionRendererProps {
  option: Option;
}

const DefaultOptionRenderer = ({ option }: OptionRendererProps) => {
  return <span>{option.label}</span>;
};

export interface ISelectorProps {
  options: Option[];
  label: string;
  size?: 'large' | 'small';
  onChange?: (value: string | undefined) => void;
  value?: string;
  OptionRenderer?: ComponentType<OptionRendererProps>;
}

const Selector = ({
  options,
  label,
  size = 'large',
  value,
  onChange,
  OptionRenderer = DefaultOptionRenderer
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

export default Selector;
