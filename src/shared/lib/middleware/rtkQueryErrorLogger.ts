import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses `isRejectedWithValue` to determine whether an action is a rejected action
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!');
  }

  return next(action);
};
