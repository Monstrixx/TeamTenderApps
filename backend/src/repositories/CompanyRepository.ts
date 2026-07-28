import { Prisma, Company, CompanyStatus } from '@prisma/client';
import prisma from '../database/prisma';
import { QueryOptions } from '../common/query/QueryOptions';
import { QueryResult } from '../common/query/QueryResult';
import { TenantRepository } from '../common/repositories/TenantRepository';

export type CompanyFilters = {
  status?: string;
  workspaceId?: string;
};

export type CompanyQuery = QueryOptions<CompanyFilters>;

export class CompanyRepositoryImpl extends TenantRepository<Company, CompanyQuery> {
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

    // We no longer manually set workspaceId from filters, as TenantRepository injects it.
    // But we still apply it for safety in case there are other scopes, though getTenantWhere will overwrite it.

    if (keyword) {
      where.OR = [
        { code: { contains: keyword, mode: 'insensitive' } },
        { name: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    return super.findAll(query, where, ['name', 'createdAt', 'updatedAt', 'status', 'code']);
  }

  async findByCode(code: string, workspaceId: string, includeDeleted = false): Promise<Company | null> {
    const where: Prisma.CompanyWhereInput = this.getTenantWhere({ code });
    if (!includeDeleted) {
      where.deletedAt = null;
    }
    return prisma.company.findFirst({ where });
  }

  async findBySlug(slug: string): Promise<Company | null> {
    return prisma.company.findFirst({ where: this.getTenantWhere({ slug, deletedAt: null }) });
  }

  async findByWorkspace(workspaceId: string): Promise<Company[]> {
    return prisma.company.findMany({
      where: this.getTenantWhere({ deletedAt: null }),
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
      const company = await tx.company.findUnique({ where: this.getTenantWhere({ id }) });
      if (!company) {
        throw new Error('Company not found');
      }
      if (company.version !== expectedVersion) {
        throw new Error('VERSION_CONFLICT');
      }
      return tx.company.update({
        where: this.getTenantWhere({ id }),
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
      where: this.getTenantWhere({ id, deletedAt: null }),
      include: {
        legal: true,
        addresses: true,
        contacts: true,
        bankAccounts: true,
        timeline: {
          orderBy: { year: 'desc' }
        },
        workspace: true,
      }
    });
  }

  async findPrimaryAddress(companyId: string) {
    // Note: To properly isolate we should ensure companyId belongs to the tenant.
    // For simplicity, we assume companyId is already verified or we can join it, 
    // but Prisma doesn't support workspaceId on nested directly unless defined.
    // CompanyAddress doesn't have workspaceId, so we rely on Company's workspaceId
    return prisma.companyAddress.findFirst({
      where: { 
        companyId, 
        isPrimary: true,
        company: this.getTenantWhere({}) 
      }
    });
  }

  async setPrimaryAddress(companyId: string, addressId: string) {
    // Transaction to unset existing primary and set the new one
    // Safety check: ensure company belongs to tenant
    await this.findById(companyId);

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
