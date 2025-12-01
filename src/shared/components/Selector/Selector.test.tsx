import { render, screen } from '@testing-library/react';

import { type ISelectorProps, Selector } from './Selector.component';

import styles from './Selector.module.scss';

describe('Selector', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ];

  const defaultProps: ISelectorProps<string> = {
    options,
    placeholder: 'Select an option',
    onChange: jest.fn()
  };

  test('renders with placeholder text when no value is selected', () => {
    render(<Selector {...defaultProps} />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  test('renders with "large" size class when size prop is "large"', () => {
    render(
      <Selector
        {...defaultProps}
        size='large'
      />
    );
    const selectorElement = screen
      .getByText('Select an option')
      .closest(`.${styles.selector}`);
    expect(selectorElement).toHaveClass(styles.selector_large);
  });

  test('renders with "small" size class when size prop is "small"', () => {
    render(
      <Selector
        {...defaultProps}
        size='small'
      />
    );
    const selectorElement = screen
      .getByText('Select an option')
      .closest(`.${styles.selector}`);
    expect(selectorElement).toHaveClass(styles.selector_small);
  });

  test('renders with "large" size class by default', () => {
    render(<Selector {...defaultProps} />);
    const selectorElement = screen
      .getByText('Select an option')
      .closest(`.${styles.selector}`);
    expect(selectorElement).toHaveClass(styles.selector_large);
  });
});
