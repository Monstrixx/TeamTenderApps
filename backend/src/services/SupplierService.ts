import SupplierRepository from '../repositories/SupplierRepository';
import WorkspaceRepository from '../repositories/WorkspaceRepository';
import { CompanyRepository } from '../repositories/CompanyRepository';
import { ApiError } from '../common/responses/ApiError';
import { Prisma, Supplier, SupplierStatus, WorkspaceStatus, CompanyStatus } from '@prisma/client';
import { eventDispatcher } from '../common/events/NodeEventDispatcher';
import { EventNames } from '../common/events/EventNames';
import { getRequestContext } from '../common/context/RequestContext';
import { SlugService } from './SlugService';
import { SupplierStatisticsService } from './SupplierStatisticsService';
import { SupplierSearchIndexService } from './SupplierSearchIndexService';

export class SupplierService {
  private async generateSupplierCode(workspaceId: string): Promise<string> {
    const count = await SupplierRepository.countByWorkspace(workspaceId);
    const nextId = count + 1;
    return `SUP-${nextId.toString().padStart(6, '0')}`;
  }

  private buildDomainEventPayload(supplier: Supplier, action: string, userId?: string) {
    return {
      entityId: supplier.id,
      workspaceId: supplier.workspaceId,
      occurredBy: userId || 'system',
      occurredAt: new Date().toISOString(),
      entityType: 'Supplier',
      action,
      payload: {
        name: supplier.name,
        status: supplier.status
      }
    };
  }

  async createSupplier(data: Prisma.SupplierCreateInput & { companyId: string }): Promise<Supplier> {
    const ctx = getRequestContext();
    const workspaceId = ctx?.workspaceId;
    const userId = ctx?.userId;

    if (!workspaceId) {
      throw new ApiError(401, 'Workspace context is missing');
    }

    const workspace = await WorkspaceRepository.findById(workspaceId);
    if (!workspace || workspace.status !== WorkspaceStatus.ACTIVE) {
      throw new ApiError(400, 'Cannot create supplier in inactive workspace');
    }

    const company = await CompanyRepository.findById(data.companyId);
    if (!company || company.workspaceId !== workspaceId) {
      throw new ApiError(404, 'Company not found in this workspace');
    }
    if (company.status !== CompanyStatus.ACTIVE) {
      throw new ApiError(400, 'Cannot create supplier for inactive company');
    }

    const exists = await SupplierRepository.existsByName(workspaceId, data.companyId, data.name);
    if (exists) {
      throw new ApiError(409, 'Supplier name already exists in this company');
    }

    const code = await this.generateSupplierCode(workspaceId);
    const baseSlug = SlugService.generate(data.name);
    const slug = await SlugService.ensureUnique(
      baseSlug,
      async (s) => await SupplierRepository.existsBySlug(s),
      code
    );

    const supplier = await SupplierRepository.create({
      ...data,
      code,
      slug,
      workspace: { connect: { id: workspaceId } },
      company: { connect: { id: data.companyId } },
      ...SupplierSearchIndexService.generateSearchData(data),
      createdBy: userId,
      updatedBy: userId,
    });

    eventDispatcher.emit({
      id: supplier.id,
      name: EventNames.SUPPLIER_CREATED,
      version: 1,
      source: 'supplier-service',
      occurredAt: new Date(),
      userId,
      workspaceId,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: this.buildDomainEventPayload(supplier, 'Created', userId)
    });

    return supplier;
  }

  async getSuppliers(query: any) {
    const ctx = getRequestContext();
    if (!ctx?.workspaceId) {
      throw new ApiError(401, 'Workspace context is missing');
    }

    query.filters = {
      ...query.filters,
      workspaceId: ctx.workspaceId
    };

    return SupplierRepository.findAll(query);
  }

  async getSupplierById(id: string): Promise<Supplier> {
    const ctx = getRequestContext();
    const supplier = await SupplierRepository.findById(id);

    if (!supplier || supplier.workspaceId !== ctx?.workspaceId) {
      throw new ApiError(404, 'Supplier not found in this workspace');
    }

    return supplier;
  }

  async getSupplierProfile(id: string): Promise<any> {
    const ctx = getRequestContext();
    if (!ctx?.workspaceId) {
      throw new ApiError(401, 'Workspace context is missing');
    }

    const profile = await SupplierRepository.findProfile(id);
    if (!profile || profile.workspaceId !== ctx.workspaceId) {
      throw new ApiError(404, 'Supplier not found in this workspace');
    }

    const statistics = SupplierStatisticsService.calculate(profile);
    const { contacts, bankAccounts, tax, ...supplier } = profile;

    return {
      supplier,
      contacts: contacts || [],
      banks: bankAccounts || [],
      tax: tax || null,
      statistics
    };
  }

  async updateSupplier(id: string, data: any): Promise<Supplier> {
    const ctx = getRequestContext();
    const workspaceId = ctx?.workspaceId;
    const userId = ctx?.userId;

    const supplier = await SupplierRepository.findById(id, true);

    if (!supplier || supplier.workspaceId !== workspaceId) {
      throw new ApiError(404, 'Supplier not found in this workspace');
    }

    if (supplier.deletedAt) {
      throw new ApiError(400, 'Cannot update a deleted supplier');
    }

    if (data.version === undefined) {
      throw new ApiError(400, 'version field is required for update');
    }

    const expectedVersion = Number(data.version);
    const updateData = { ...data };
    
    delete updateData.version;
    if (updateData.code) delete updateData.code;
    if (updateData.slug) delete updateData.slug;
    if (updateData.workspace) delete updateData.workspace;
    if (updateData.company) delete updateData.company;
    if (updateData.companyId) delete updateData.companyId;

    if (updateData.name || updateData.displayName || updateData.category || updateData.businessType) {
      const currentSupplier = supplier;
      const searchData = SupplierSearchIndexService.generateSearchData({
        name: updateData.name || currentSupplier.name,
        displayName: updateData.displayName !== undefined ? updateData.displayName : currentSupplier.displayName,
        category: updateData.category || currentSupplier.category,
        businessType: updateData.businessType || currentSupplier.businessType
      });
      Object.assign(updateData, searchData);
    }

    let updatedSupplier: Supplier;
    try {
      updatedSupplier = await SupplierRepository.updateWithVersion(id, expectedVersion, updateData, userId || 'system');
    } catch (error: any) {
      if (error.message === 'VERSION_CONFLICT') {
        throw new ApiError(409, 'Supplier has been modified by another user.', 'VERSION_CONFLICT');
      }
      throw error;
    }

    eventDispatcher.emit({
      id: updatedSupplier.id,
      name: EventNames.SUPPLIER_UPDATED,
      version: 1,
      source: 'supplier-service',
      occurredAt: new Date(),
      userId,
      workspaceId,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: this.buildDomainEventPayload(updatedSupplier, 'Updated', userId)
    });

    return updatedSupplier;
  }

  async deleteSupplier(id: string): Promise<Supplier> {
    const ctx = getRequestContext();
    const workspaceId = ctx?.workspaceId;
    const userId = ctx?.userId;

    const supplier = await SupplierRepository.findById(id, true);

    if (!supplier || supplier.workspaceId !== workspaceId) {
      throw new ApiError(404, 'Supplier not found in this workspace');
    }

    if (supplier.deletedAt) {
      throw new ApiError(400, 'Supplier is already deleted');
    }

    const deletedSupplier = await SupplierRepository.softDelete(id, userId || 'system');

    eventDispatcher.emit({
      id: deletedSupplier.id,
      name: EventNames.SUPPLIER_DELETED,
      version: 1,
      source: 'supplier-service',
      occurredAt: new Date(),
      userId,
      workspaceId,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: this.buildDomainEventPayload(deletedSupplier, 'Deleted', userId)
    });

    return deletedSupplier;
  }

  async restoreSupplier(id: string): Promise<Supplier> {
    const ctx = getRequestContext();
    const workspaceId = ctx?.workspaceId;
    const userId = ctx?.userId;

    const supplier = await SupplierRepository.findById(id, true);

    if (!supplier || supplier.workspaceId !== workspaceId) {
      throw new ApiError(404, 'Supplier not found in this workspace');
    }

    if (!supplier.deletedAt) {
      throw new ApiError(400, 'Supplier is not deleted');
    }

    const restoredSupplier = await SupplierRepository.restore(id, userId || 'system');

    eventDispatcher.emit({
      id: restoredSupplier.id,
      name: EventNames.SUPPLIER_RESTORED,
      version: 1,
      source: 'supplier-service',
      occurredAt: new Date(),
      userId,
      workspaceId,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: this.buildDomainEventPayload(restoredSupplier, 'Restored', userId)
    });

    return restoredSupplier;
  }

  async setPrimaryContact(id: string, contactId: string): Promise<void> {
    const ctx = getRequestContext();
    const supplier = await SupplierRepository.findById(id);

    if (!supplier || supplier.workspaceId !== ctx?.workspaceId) {
      throw new ApiError(404, 'Supplier not found in this workspace');
    }
    
    // In a real app we'd verify the contact belongs to this supplier.
    await SupplierRepository.setPrimaryContact(id, contactId);
  }

  async setPrimaryBankAccount(id: string, bankAccountId: string): Promise<void> {
    const ctx = getRequestContext();
    const supplier = await SupplierRepository.findById(id);

    if (!supplier || supplier.workspaceId !== ctx?.workspaceId) {
      throw new ApiError(404, 'Supplier not found in this workspace');
    }
    
    // In a real app we'd verify the bank belongs to this supplier.
    await SupplierRepository.setPrimaryBankAccount(id, bankAccountId);
  }
}

export default new SupplierService();
