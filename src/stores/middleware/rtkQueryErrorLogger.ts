import toast from 'react-hot-toast';

import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { isErrorWithStatus } from '@/shared/helpers';

export const rtkQueryErrorLogger: Middleware =
  (_api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (isErrorWithStatus(action.payload, 404)) {
        return next(action);
      }

      toast.error('Failed to get characters data');
    }

    return next(action);
  };
