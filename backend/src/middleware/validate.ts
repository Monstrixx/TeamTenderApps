import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { ApiError } from '../common/responses/ApiError';

export const validate = (schema: ZodObject<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      if (parsed.body !== undefined) Object.defineProperty(req, 'body', { value: parsed.body, writable: true });
      if (parsed.query !== undefined) Object.defineProperty(req, 'query', { value: parsed.query, writable: true });
      if (parsed.params !== undefined) Object.defineProperty(req, 'params', { value: parsed.params, writable: true });
      
      return next();
    } catch (error) {
      if (error instanceof ZodError || (error as Error).name === 'ZodError') {
        const errObj = error as { issues?: unknown[], errors?: unknown[] };
        const issues = errObj.issues || errObj.errors || [];
        const details = issues.map((err: any) => ({
          field: err.path ? err.path.join('.') : '',
          message: err.message,
        }));
        return next(new ApiError(400, 'Validation Error', 'VALIDATION_ERROR', details));
      }
      return next(error);
    }
  };
};
