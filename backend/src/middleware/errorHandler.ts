import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../common/responses/ApiError';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';

export const errorHandler = (err: Error | ApiError, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError || err.constructor.name === 'ApiError' || (err as ApiError).statusCode) {
    const apiError = err as ApiError;
    res.status(apiError.statusCode).json({
      success: false,
      error: {
        code: apiError.codeString,
        message: err.message,
        details: (err as any).details,
      },
      meta: {
        requestId: req.headers['X-Request-ID'] as string,
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: (err as any).errors || (err as any).issues,
      },
      meta: {
        requestId: req.headers['X-Request-ID'] as string,
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }

  // Unhandled Errors
  logger.error(err, 'Unhandled Error');
  res.status(500).json({
    success: false,
    error: {
      code: '500',
      message: 'Internal Server Error: ' + err.message,
    },
    meta: {
      requestId: req.headers['X-Request-ID'] as string,
      timestamp: new Date().toISOString(),
    },
  });
};
