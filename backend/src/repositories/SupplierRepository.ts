import { TenantRepository } from '../common/repositories/TenantRepository';
import { Supplier, Prisma } from '@prisma/client';
import prisma from '../database/prisma';

export class SupplierRepository extends TenantRepository<Supplier> {
  constructor() {
    super(prisma.supplier);
  }

  async findByCode(code: string): Promise<Supplier | null> {
    return this.model.findFirst({ where: this.getTenantWhere({ code, deletedAt: null }) });
  }

  async findBySlug(slug: string): Promise<Supplier | null> {
    return this.model.findFirst({ where: this.getTenantWhere({ slug, deletedAt: null }) });
  }

  async findByCompany(companyId: string): Promise<Supplier[]> {
    return this.model.findMany({ where: this.getTenantWhere({ companyId, deletedAt: null }) });
  }

  async findByWorkspace(workspaceId: string): Promise<Supplier[]> {
    return this.model.findMany({ where: this.getTenantWhere({ deletedAt: null }) });
  }

  async findProfile(id: string): Promise<any | null> {
    return prisma.supplier.findFirst({
      where: this.getTenantWhere({ id, deletedAt: null }),
      include: {
        contacts: true,
        bankAccounts: true,
        tax: true,
      },
    });
  }

  async setPrimaryContact(supplierId: string, contactId: string): Promise<void> {
    await prisma.$transaction([
      prisma.supplierContact.updateMany({
        where: { supplierId },
        data: { isPrimary: false },
      }),
      prisma.supplierContact.update({
        where: { id: contactId },
        data: { isPrimary: true },
      }),
    ]);
  }

  async setPrimaryBankAccount(supplierId: string, bankAccountId: string): Promise<void> {
    await prisma.$transaction([
      prisma.supplierBankAccount.updateMany({
        where: { supplierId },
        data: { isPrimary: false },
      }),
      prisma.supplierBankAccount.update({
        where: { id: bankAccountId },
        data: { isPrimary: true },
      }),
    ]);
  }

  async existsByName(workspaceId: string, companyId: string, name: string): Promise<boolean> {
    const count = await prisma.supplier.count({
      where: this.getTenantWhere({
        companyId,
        name: { equals: name, mode: 'insensitive' },
        deletedAt: null,
      }),
    });
    return count > 0;
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const count = await prisma.supplier.count({
      where: this.getTenantWhere({ slug, deletedAt: null }),
    });
    return count > 0;
  }

  async existsByCode(code: string): Promise<boolean> {
    const count = await prisma.supplier.count({
      where: this.getTenantWhere({ code, deletedAt: null }),
    });
    return count > 0;
  }

  async countByWorkspace(workspaceId: string): Promise<number> {
    return prisma.supplier.count({
      where: this.getTenantWhere({ deletedAt: null }),
    });
  }

  async countByCompany(companyId: string): Promise<number> {
    return prisma.supplier.count({
      where: this.getTenantWhere({ companyId, deletedAt: null }),
    });
  }

  async create(data: Prisma.SupplierCreateInput): Promise<Supplier> {
    return this.model.create({ data });
  }

  async updateWithVersion(id: string, version: number, data: any, updatedBy: string): Promise<Supplier> {
    try {
      const [updated] = await prisma.$transaction([
        prisma.supplier.update({
          where: this.getTenantWhere({ id, version }),
          data: {
            ...data,
            version: { increment: 1 },
            updatedBy,
          },
        }),
      ]);
      return updated;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error('VERSION_CONFLICT');
      }
      throw error;
    }
  }
}

export default new SupplierRepository();
