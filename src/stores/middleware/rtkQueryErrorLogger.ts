import toast from 'react-hot-toast';

import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger: Middleware =
  (_api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const hasStatus = (payload: unknown): payload is { status: number } =>
        typeof payload === 'object' &&
        payload !== null &&
        'status' in payload &&
        typeof (payload as { status: unknown }).status === 'number';
      if (hasStatus(action.payload) && action.payload.status === 404) {
        return next(action);
      }

      toast.error('Failed to get characters data');
    }

    return next(action);
  };
