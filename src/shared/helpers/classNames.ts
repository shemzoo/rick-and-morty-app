import classnames from 'classnames';

type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: any }
  | ClassValue[];

export const classNames = (...args: ClassValue[]): string => {
  return classnames(...args);
};
