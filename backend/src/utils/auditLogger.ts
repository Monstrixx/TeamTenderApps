import { logger } from './logger';

type AuthEvent = 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'TOKEN_REFRESH' | 'LOGOUT' | 'TOKEN_REVOKED';

interface AuditLogPayload {
  event: AuthEvent;
  requestId: string;
  userId?: string;
  workspaceId?: string;
  ip?: string;
  userAgent?: string;
  timestamp: string;
  details?: Record<string, unknown>;
}

export const auditLog = (payload: AuditLogPayload) => {
  logger.info({
    audit: true,
    ...payload,
  });
};
