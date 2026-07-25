import { CompanyRepository } from '../repositories/CompanyRepository';
import WorkspaceRepository from '../repositories/WorkspaceRepository';
import { ApiError } from '../common/responses/ApiError';
import { Prisma, Company, CompanyStatus, WorkspaceStatus } from '@prisma/client';
import { eventDispatcher } from '../common/events/NodeEventDispatcher';
import { EventNames } from '../common/events/EventNames';
import { getRequestContext } from '../common/context/RequestContext';
import { CompanyQuery } from '../repositories/CompanyRepository';
import { SlugService } from './SlugService';
import { CompanyStatisticsService } from './CompanyStatisticsService';

export class CompanyService {
  private async generateCompanyCode(): Promise<string> {
    const count = await CompanyRepository.count();
    const nextId = count + 1;
    return `CMP-${nextId.toString().padStart(6, '0')}`;
  }

  private buildDomainEventPayload(company: Company, action: string, userId?: string) {
    return {
      entityId: company.id,
      workspaceId: company.workspaceId,
      occurredBy: userId || 'system',
      occurredAt: new Date().toISOString(),
      entityType: 'Company',
      action,
      payload: {
        name: company.name,
        status: company.status
      }
    };
  }

  async createCompany(data: Prisma.CompanyCreateInput): Promise<Company> {
    const ctx = getRequestContext();
    const workspaceId = ctx?.workspaceId;
    const userId = ctx?.userId;

    if (!workspaceId) {
      throw new ApiError(401, 'Workspace context is missing');
    }

    const workspace = await WorkspaceRepository.findById(workspaceId);
    if (!workspace) {
      throw new ApiError(404, 'Workspace not found');
    }
    if (workspace.status !== WorkspaceStatus.ACTIVE) {
      throw new ApiError(400, 'Cannot create company in inactive workspace');
    }

    // Check duplicate name in same workspace
    const existing = await CompanyRepository.findAll({
      keyword: data.name,
      filters: { workspaceId }
    });
    
    if (existing.data.some(c => c.name.toLowerCase() === data.name.toLowerCase())) {
      throw new ApiError(409, 'Company name already exists in this workspace');
    }

    const code = await this.generateCompanyCode();
    
    const baseSlug = SlugService.generate(data.name);
    const slug = await SlugService.ensureUnique(
      baseSlug,
      async (s) => (await CompanyRepository.findBySlug(s)) !== null,
      code
    );

    const company = await CompanyRepository.create({
      ...data,
      code,
      slug,
      workspace: { connect: { id: workspaceId } },
      createdBy: userId,
      updatedBy: userId,
    });

    eventDispatcher.emit({
      id: company.id,
      name: EventNames.COMPANY_CREATED,
      version: 1,
      source: 'company-service',
      occurredAt: new Date(),
      userId,
      workspaceId,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: this.buildDomainEventPayload(company, 'Created', userId)
    });

    return company;
  }

  async getCompanies(query: CompanyQuery) {
    const ctx = getRequestContext();
    if (!ctx?.workspaceId) {
      throw new ApiError(401, 'Workspace context is missing');
    }
    
    // Auto-filter by workspace
    query.filters = {
      ...query.filters,
      workspaceId: ctx.workspaceId
    };

    return CompanyRepository.findAll(query);
  }

  async getCompanyById(id: string): Promise<Company> {
    const ctx = getRequestContext();
    const company = await CompanyRepository.findById(id);
    
    if (!company || company.workspaceId !== ctx?.workspaceId) {
      throw new ApiError(404, 'Company not found in this workspace');
    }
    
    return company;
  }

  async getCompanyProfile(id: string): Promise<any> {
    const ctx = getRequestContext();
    if (!ctx?.workspaceId) {
      throw new ApiError(401, 'Workspace context is missing');
    }

    const companyData = await CompanyRepository.getProfile(id, ctx.workspaceId);
    if (!companyData) {
      throw new ApiError(404, 'Company not found in this workspace');
    }

    const { legal, addresses, workspace, ...company } = companyData;
    const statistics = await CompanyStatisticsService.getStatistics(company, legal, addresses || []);

    return {
      company,
      legal: legal || null,
      addresses: addresses || [],
      workspace,
      statistics
    };
  }

  async updateCompany(id: string, data: Prisma.CompanyUpdateInput & { version?: number }): Promise<Company> {
    const ctx = getRequestContext();
    const workspaceId = ctx?.workspaceId;
    const userId = ctx?.userId;

    const company = await CompanyRepository.findById(id, true);
    
    if (!company || company.workspaceId !== workspaceId) {
      throw new ApiError(404, 'Company not found in this workspace');
    }

    if (company.deletedAt) {
      throw new ApiError(400, 'Cannot update a deleted company');
    }

    if (data.version === undefined) {
      throw new ApiError(400, 'version field is required for update');
    }

    const expectedVersion = Number(data.version);
    const updateData: Prisma.CompanyUpdateInput = {
      ...data,
      updatedBy: userId,
    };
    
    // Exclude special fields from update payload
    delete (updateData as any).version;
    if (updateData.code) delete updateData.code;
    if (updateData.slug) delete updateData.slug;
    if (updateData.workspace) delete updateData.workspace;

    let updatedCompany: Company;
    try {
      updatedCompany = await CompanyRepository.updateWithVersion(id, expectedVersion, updateData);
    } catch (error: any) {
      if (error.message === 'VERSION_CONFLICT') {
        throw new ApiError(409, 'Company has been modified by another user.', 'VERSION_CONFLICT');
      }
      throw error;
    }

    eventDispatcher.emit({
      id: updatedCompany.id,
      name: EventNames.COMPANY_UPDATED,
      version: 1,
      source: 'company-service',
      occurredAt: new Date(),
      userId,
      workspaceId,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: this.buildDomainEventPayload(updatedCompany, 'Updated', userId)
    });

    return updatedCompany;
  }

  async deleteCompany(id: string): Promise<Company> {
    const ctx = getRequestContext();
    const workspaceId = ctx?.workspaceId;
    const userId = ctx?.userId;

    const company = await CompanyRepository.findById(id, true);
    
    if (!company || company.workspaceId !== workspaceId) {
      throw new ApiError(404, 'Company not found in this workspace');
    }

    if (company.deletedAt) {
      throw new ApiError(400, 'Company is already deleted');
    }

    // TODO: Verify if it has active relations in other domains (Suppliers, etc.)
    // For now, allow soft delete
    const deletedCompany = await CompanyRepository.softDelete(id, userId || 'system');

    eventDispatcher.emit({
      id: deletedCompany.id,
      name: EventNames.COMPANY_DELETED,
      version: 1,
      source: 'company-service',
      occurredAt: new Date(),
      userId,
      workspaceId,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: this.buildDomainEventPayload(deletedCompany, 'Deleted', userId)
    });

    return deletedCompany;
  }

  async restoreCompany(id: string): Promise<Company> {
    const ctx = getRequestContext();
    const workspaceId = ctx?.workspaceId;
    const userId = ctx?.userId;

    const company = await CompanyRepository.findById(id, true);
    
    if (!company || company.workspaceId !== workspaceId) {
      throw new ApiError(404, 'Company not found in this workspace');
    }

    if (!company.deletedAt) {
      throw new ApiError(400, 'Company is not deleted');
    }

    const restoredCompany = await CompanyRepository.restore(id, userId || 'system');

    eventDispatcher.emit({
      id: restoredCompany.id,
      name: EventNames.COMPANY_RESTORED,
      version: 1,
      source: 'company-service',
      occurredAt: new Date(),
      userId,
      workspaceId,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: this.buildDomainEventPayload(restoredCompany, 'Restored', userId)
    });

    return restoredCompany;
  }
}

export default new CompanyService();
