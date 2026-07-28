import prisma from '../database/prisma';
import { Tender, Prisma } from '@prisma/client';

import { TenantRepository } from '../common/repositories/TenantRepository';
import { QueryOptions } from '../common/query/QueryOptions';

export class TenderRepository extends TenantRepository<Tender, QueryOptions> {
  constructor() {
    super(prisma.tender);
  }
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
      where: this.getTenantWhere({ id }),
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

  async findByCode(code: string): Promise<Tender | null> {
    return prisma.tender.findFirst({
      where: this.getTenantWhere({ code }),
    });
  }

  async findAllWorkspaceTenders(): Promise<Tender[]> {
    return prisma.tender.findMany({
      where: this.getTenantWhere({ deletedAt: null }),
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id: string, data: Prisma.TenderUpdateInput, expectedVersion?: number): Promise<Tender> {
    const whereClause = this.getTenantWhere({ id });
    
    // Optimistic locking support
    if (expectedVersion !== undefined) {
      (whereClause as any).version = expectedVersion;
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
      where: this.getTenantWhere({ id }),
      data: {
        deletedAt: new Date(),
        status: 'CANCELLED'
      },
    });
  }
}

export default new TenderRepository();
