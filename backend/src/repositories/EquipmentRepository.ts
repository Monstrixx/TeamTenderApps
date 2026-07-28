import prisma from '../database/prisma';
import { Equipment, Prisma } from '@prisma/client';
import { QueryOptions } from '../common/query/QueryOptions';
import { TenantRepository } from '../common/repositories/TenantRepository';

export class EquipmentRepositoryImpl extends TenantRepository<Equipment, QueryOptions> {
  constructor() {
    super(prisma.equipment);
  }
  
  async create(data: Prisma.EquipmentUncheckedCreateInput): Promise<Equipment> {
    return prisma.equipment.create({
      data,
      include: {
        category: true,
        specifications: true,
      },
    });
  }

  async findById(id: string): Promise<Equipment | null> {
    return prisma.equipment.findUnique({
      where: this.getTenantWhere({ id }),
      include: {
        category: true,
        specifications: true,
        certifications: true,
        usage: true,
        maintenance: {
          include: { items: true }
        },
        assignments: {
          where: { releasedAt: null }
        },
        featureVector: true,
      },
    });
  }

  async findByCode(code: string): Promise<Equipment | null> {
    return prisma.equipment.findFirst({
      where: this.getTenantWhere({ code }),
      include: {
        category: true,
      },
    });
  }

  async findAllWorkspaceEquipments(): Promise<Equipment[]> {
    return prisma.equipment.findMany({
      where: this.getTenantWhere({ deletedAt: null }),
      include: {
        category: true,
      },
    });
  }

  async update(id: string, data: Prisma.EquipmentUpdateInput, expectedVersion?: number): Promise<Equipment> {
    const whereClause = this.getTenantWhere({ id });
    
    // Optimistic locking support
    if (expectedVersion !== undefined) {
      (whereClause as any).version = expectedVersion;
      data.version = { increment: 1 };
    }

    try {
      return await prisma.equipment.update({
        where: whereClause,
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        if (expectedVersion !== undefined) {
          throw new Error('Concurrency conflict: Equipment version mismatch or not found.');
        }
      }
      throw error;
    }
  }

  async softDelete(id: string, deletedBy: string): Promise<Equipment> {
    return prisma.equipment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        // Cannot update deletedBy because it is not on the schema, keeping it simple
        status: 'RETIRED'
      },
    });
  }
}

export default new EquipmentRepositoryImpl();
