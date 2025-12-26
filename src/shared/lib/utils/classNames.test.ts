import { classNames } from './classNames';

describe('classNames', () => {
  test('should return a single class string', () => {
    expect(classNames('class1')).toBe('class1');
  });

  test('should combine multiple class strings', () => {
    expect(classNames('class1', 'class2', 'class3')).toBe(
      'class1 class2 class3'
    );
  });

  test('should ignore falsy values', () => {
    expect(classNames('class1', false, null, undefined, '', 0, 'class2')).toBe(
      'class1 class2'
    );
  });

  test('should return an empty string if no arguments are provided', () => {
    expect(classNames()).toBe('');
  });
});
