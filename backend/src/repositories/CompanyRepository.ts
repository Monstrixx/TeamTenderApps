import { Prisma, Company, CompanyStatus } from '@prisma/client';
import prisma from '../database/prisma';
import { QueryOptions } from '../common/query/QueryOptions';
import { QueryResult } from '../common/query/QueryResult';
import { BaseRepository } from '../common/repositories/BaseRepository';

export type CompanyFilters = {
  status?: string;
  workspaceId?: string;
};

export type CompanyQuery = QueryOptions<CompanyFilters>;

export class CompanyRepositoryImpl extends BaseRepository<Company, CompanyQuery> {
  constructor() {
    super(prisma.company);
  }

  async findAll(query: CompanyQuery): Promise<QueryResult<Company>> {
    const { keyword, includeDeleted = false, filters } = query;

    const where: Prisma.CompanyWhereInput = {};

    if (!includeDeleted) {
      where.deletedAt = null;
    }

    if (filters?.status) {
      where.status = filters.status as CompanyStatus;
    }

    if (filters?.workspaceId) {
      where.workspaceId = filters.workspaceId;
    }

    if (keyword) {
      where.OR = [
        { code: { contains: keyword, mode: 'insensitive' } },
        { name: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    return super.findAll(query, where, ['name', 'createdAt', 'updatedAt', 'status', 'code']);
  }

  async findByCode(code: string, workspaceId: string, includeDeleted = false): Promise<Company | null> {
    const where: Prisma.CompanyWhereInput = { code, workspaceId };
    if (!includeDeleted) {
      where.deletedAt = null;
    }
    return prisma.company.findFirst({ where });
  }

  async findBySlug(slug: string): Promise<Company | null> {
    return prisma.company.findFirst({ where: { slug, deletedAt: null } });
  }

  async findByWorkspace(workspaceId: string): Promise<Company[]> {
    return prisma.company.findMany({
      where: { workspaceId, deletedAt: null },
    });
  }

  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    return prisma.company.create({ data });
  }

  async update(id: string, data: Prisma.CompanyUpdateInput): Promise<Company> {
    return prisma.company.update({
      where: { id },
      data,
    });
  }

  async updateWithVersion(id: string, expectedVersion: number, data: Prisma.CompanyUpdateInput): Promise<Company> {
    const result = await prisma.$transaction(async (tx) => {
      const company = await tx.company.findUnique({ where: { id } });
      if (!company) {
        throw new Error('Company not found');
      }
      if (company.version !== expectedVersion) {
        throw new Error('VERSION_CONFLICT');
      }
      return tx.company.update({
        where: { id },
        data: {
          ...data,
          version: { increment: 1 }
        },
      });
    });
    return result;
  }

  async getProfile(id: string, workspaceId: string): Promise<any> {
    return prisma.company.findFirst({
      where: { id, workspaceId, deletedAt: null },
      include: {
        legal: true,
        addresses: true,
        workspace: true,
      }
    });
  }

  async findPrimaryAddress(companyId: string) {
    return prisma.companyAddress.findFirst({
      where: { companyId, isPrimary: true }
    });
  }

  async setPrimaryAddress(companyId: string, addressId: string) {
    // Transaction to unset existing primary and set the new one
    return prisma.$transaction([
      prisma.companyAddress.updateMany({
        where: { companyId, isPrimary: true },
        data: { isPrimary: false }
      }),
      prisma.companyAddress.update({
        where: { id: addressId },
        data: { isPrimary: true }
      })
    ]);
  }
}

export const CompanyRepository = new CompanyRepositoryImpl();
export default CompanyRepository;
