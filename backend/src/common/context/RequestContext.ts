import { AsyncLocalStorage } from 'async_hooks';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { WorkspaceRoleType, WorkspacePermission } from '@prisma/client';

export interface WorkspaceRuntimeContext {
  requestId: string;
  userId: string;
  workspaceId: string;
  role: WorkspaceRoleType | null;
  permissions: WorkspacePermission[];
  ipAddress: string;
  userAgent: string;
  correlationId: string;
  startedAt: Date;
}

export const requestContextStore = new AsyncLocalStorage<WorkspaceRuntimeContext>();

export const getRequestContext = (): WorkspaceRuntimeContext | undefined => {
  return requestContextStore.getStore();
};

export const requestContextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers['x-request-id'] as string || uuidv4();
  const correlationId = req.headers['x-correlation-id'] as string || requestId;
  const ipAddress = req.ip || req.socket.remoteAddress || '';
  const userAgent = req.headers['user-agent'] || '';

  const context: WorkspaceRuntimeContext = {
    requestId,
    correlationId,
    userId: '', // populated later by auth middleware
    workspaceId: '', // populated later by workspace middleware
    role: null, // populated by workspace middleware
    permissions: [], // populated by workspace middleware
    ipAddress,
    userAgent,
    startedAt: new Date(),
  };

  requestContextStore.run(context, () => {
    next();
  });
};
