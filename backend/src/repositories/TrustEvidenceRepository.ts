import { PrismaClient, TrustEvidence, Prisma, EntityType, TrustVerificationStatus } from '@prisma/client';
import prisma from '../database/prisma';

export class TrustEvidenceRepository {
  async create(data: Prisma.TrustEvidenceUncheckedCreateInput): Promise<TrustEvidence> {
    return prisma.trustEvidence.create({
      data,
    });
  }

  async findById(id: string): Promise<TrustEvidence | null> {
    return prisma.trustEvidence.findUnique({
      where: { id },
    });
  }

  async findByEntity(entityType: EntityType, entityId: string): Promise<TrustEvidence[]> {
    return prisma.trustEvidence.findMany({
      where: { entityType, entityId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id: string, data: Prisma.TrustEvidenceUpdateInput): Promise<TrustEvidence> {
    return prisma.trustEvidence.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<TrustEvidence> {
    return prisma.trustEvidence.delete({
      where: { id },
    });
  }
}
