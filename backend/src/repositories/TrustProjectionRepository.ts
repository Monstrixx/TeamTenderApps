import { PrismaClient, TrustProjection, Prisma, EntityType, TrustVerificationStatus } from '@prisma/client';
import prisma from '../database/prisma';

export class TrustProjectionRepository {
  async upsert(entityType: EntityType, entityId: string, data: Omit<Prisma.TrustProjectionUncheckedCreateInput, 'entityType' | 'entityId'>): Promise<TrustProjection> {
    return prisma.trustProjection.upsert({
      where: {
        entityType_entityId: {
          entityType,
          entityId
        }
      },
      create: {
        entityType,
        entityId,
        ...data
      },
      update: data
    });
  }

  async findByEntity(entityType: EntityType, entityId: string): Promise<TrustProjection | null> {
    return prisma.trustProjection.findUnique({
      where: {
        entityType_entityId: {
          entityType,
          entityId
        }
      }
    });
  }
}
