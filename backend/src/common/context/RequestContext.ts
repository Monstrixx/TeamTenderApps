import { AsyncLocalStorage } from 'async_hooks';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export interface RequestContext {
  requestId: string;
  correlationId: string;
  userId?: string;
  workspaceId?: string;
  ipAddress?: string;
  userAgent?: string;
  startedAt: Date;
}

export const requestContextStore = new AsyncLocalStorage<RequestContext>();

export const getRequestContext = (): RequestContext | undefined => {
  return requestContextStore.getStore();
};

export const requestContextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers['x-request-id'] as string || uuidv4();
  const correlationId = req.headers['x-correlation-id'] as string || requestId;
  const ipAddress = req.ip || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  const context: RequestContext = {
    requestId,
    correlationId,
    ipAddress,
    userAgent,
    startedAt: new Date(),
  };

  requestContextStore.run(context, () => {
    next();
  });
};
