import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithStatus(
  error: unknown,
  status: number
): error is FetchBaseQueryError & { status: number } {
  return isFetchBaseQueryError(error) && error.status === status;
}
