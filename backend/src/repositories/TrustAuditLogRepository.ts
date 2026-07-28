import { PrismaClient, TrustAuditLog, Prisma, EntityType } from '@prisma/client';
import prisma from '../database/prisma';

export class TrustAuditLogRepository {
  async log(data: Prisma.TrustAuditLogUncheckedCreateInput): Promise<TrustAuditLog> {
    return prisma.trustAuditLog.create({
      data,
    });
  }

  async findByEntity(entityType: EntityType, entityId: string): Promise<TrustAuditLog[]> {
    return prisma.trustAuditLog.findMany({
      where: { entityType, entityId },
      orderBy: { timestamp: 'desc' }
    });
  }
}
