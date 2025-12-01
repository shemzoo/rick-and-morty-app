import { type Status } from '@/shared/types';

const validStatuses: Status[] = ['alive', 'dead', 'unknown'];

export const isStatus = (value: unknown): value is Status => {
  if (typeof value !== 'string') {
    return false;
  }
  return validStatuses.includes(value.toLowerCase() as Status);
};
