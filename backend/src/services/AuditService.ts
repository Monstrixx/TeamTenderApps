import { auditLogger } from '../common/audit/auditLogger';
import prisma from '../database/prisma';
import { getRequestContext } from '../common/context/RequestContext';

import { AuditLevel } from '@prisma/client';

export interface AuditLogPayload {
  event: string;
  level?: AuditLevel;
  entityType: string;
  entityId?: string;
  workspaceId?: string;
  userId?: string;
  requestId?: string;
  correlationId?: string;
  ipAddress?: string;
  userAgent?: string;
  payload?: any;
}

export class AuditService {
  /**
   * Logs an audit event to both Pino and the Database (AuditLog).
   */
  static async log(data: AuditLogPayload): Promise<void> {
    const ctx = getRequestContext();
    const enrichedData = {
      level: data.level || AuditLevel.INFO,
      requestId: data.requestId || ctx?.requestId,
      correlationId: data.correlationId || ctx?.correlationId,
      userId: data.userId || ctx?.userId,
      workspaceId: data.workspaceId || ctx?.workspaceId,
      ipAddress: data.ipAddress || ctx?.ipAddress,
      userAgent: data.userAgent || ctx?.userAgent,
      ...data
    };

    // 1. Log to Pino for observability / streaming
    auditLogger.info({
      ...enrichedData,
      msg: `Audit Event: ${enrichedData.event} on ${enrichedData.entityType} ${enrichedData.entityId || ''}`
    });

    // 2. Persist to Database for compliance
    try {
      await prisma.auditLog.create({
        data: {
          event: enrichedData.event,
          level: enrichedData.level,
          entityType: enrichedData.entityType,
          entityId: enrichedData.entityId,
          workspaceId: enrichedData.workspaceId,
          userId: enrichedData.userId,
          requestId: enrichedData.requestId,
          correlationId: enrichedData.correlationId,
          ipAddress: enrichedData.ipAddress,
          userAgent: enrichedData.userAgent,
          payload: enrichedData.payload ? (enrichedData.payload as any) : undefined,
        }
      });
    } catch (error) {
      auditLogger.error({ err: error, data: enrichedData }, 'Failed to persist AuditLog to database');
    }
  }
}
