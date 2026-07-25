import prisma from '../database/prisma';
import { Tender, Prisma } from '@prisma/client';

export class TenderRepository {
  async create(data: Prisma.TenderUncheckedCreateInput): Promise<Tender> {
    return prisma.tender.create({
      data,
      include: {
        personnelRequirements: true,
        equipmentRequirements: true,
      },
    });
  }

  async findById(id: string): Promise<Tender | null> {
    return prisma.tender.findUnique({
      where: { id },
      include: {
        personnelRequirements: {
          include: {
            requiredSkills: true,
            requiredCertifications: true,
            assignments: true
          }
        },
        equipmentRequirements: {
          include: { assignments: true }
        },
        suppliers: {
          include: { supplier: true }
        },
        documents: {
          include: { document: true }
        },
        evaluations: true,
      },
    });
  }

  async findByCode(code: string, workspaceId: string): Promise<Tender | null> {
    return prisma.tender.findFirst({
      where: { code, workspaceId },
    });
  }

  async findAll(workspaceId: string): Promise<Tender[]> {
    return prisma.tender.findMany({
      where: { workspaceId, deletedAt: null },
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id: string, data: Prisma.TenderUpdateInput, expectedVersion?: number): Promise<Tender> {
    const whereClause: Prisma.TenderWhereUniqueInput = { id };
    
    // Optimistic locking support
    if (expectedVersion !== undefined) {
      whereClause.version = expectedVersion;
      data.version = { increment: 1 };
    }

    try {
      return await prisma.tender.update({
        where: whereClause,
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        if (expectedVersion !== undefined) {
          throw new Error('Concurrency conflict: Tender version mismatch or not found.');
        }
      }
      throw error;
    }
  }

  async softDelete(id: string): Promise<Tender> {
    return prisma.tender.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: 'CANCELLED'
      },
    });
  }
}

export default new TenderRepository();
