import PersonnelRepository from '../repositories/PersonnelRepository';
import WorkspaceRepository from '../repositories/WorkspaceRepository';
import { CompanyRepository } from '../repositories/CompanyRepository';
import { ApiError } from '../common/responses/ApiError';
import { Prisma, Personnel, WorkspaceStatus, CompanyStatus } from '@prisma/client';
import { eventDispatcher } from '../common/events/NodeEventDispatcher';
import { EventNames } from '../common/events/EventNames';
import { getRequestContext } from '../common/context/RequestContext';
import { SlugService } from './SlugService';
import { PersonnelStatisticsService } from './PersonnelStatisticsService';
import { PersonnelSearchIndexService } from './PersonnelSearchIndexService';

export class PersonnelService {
  private async generatePersonnelCode(workspaceId: string): Promise<string> {
    const count = await PersonnelRepository.countByWorkspace(workspaceId);
    const nextId = count + 1;
    return `PER-${nextId.toString().padStart(6, '0')}`;
  }

  private buildDomainEventPayload(personnel: Personnel, action: string, userId?: string) {
    return {
      entityId: personnel.id,
      workspaceId: personnel.workspaceId,
      occurredBy: userId || 'system',
      occurredAt: new Date().toISOString(),
      entityType: 'Personnel',
      action,
      payload: {
        fullName: personnel.fullName,
        status: personnel.status
      }
    };
  }

  async createPersonnel(data: Prisma.PersonnelCreateInput & { companyId: string }): Promise<Personnel> {
    const ctx = getRequestContext();
    const workspaceId = ctx?.workspaceId;
    const userId = ctx?.userId;

    if (!workspaceId) {
      throw new ApiError(401, 'Workspace context is missing');
    }

    const workspace = await WorkspaceRepository.findById(workspaceId);
    if (!workspace || workspace.status !== WorkspaceStatus.ACTIVE) {
      throw new ApiError(400, 'Cannot create personnel in inactive workspace');
    }

    const company = await CompanyRepository.findById(data.companyId);
    if (!company || company.workspaceId !== workspaceId) {
      throw new ApiError(404, 'Company not found in this workspace');
    }
    if (company.status !== CompanyStatus.ACTIVE) {
      throw new ApiError(400, 'Cannot create personnel for inactive company');
    }

    if (data.nik) {
      const exists = await PersonnelRepository.existsByNik(workspaceId, data.nik);
      if (exists) {
        throw new ApiError(409, 'Personnel with this NIK already exists in this workspace');
      }
    }

    const code = await this.generatePersonnelCode(workspaceId);
    const baseSlug = SlugService.generate(data.fullName);
    const slug = await SlugService.ensureUnique(
      baseSlug,
      async (s) => await PersonnelRepository.existsBySlug(s),
      code
    );

    const personnel = await PersonnelRepository.create({
      ...data,
      code,
      slug,
      workspace: { connect: { id: workspaceId } },
      company: { connect: { id: data.companyId } },
      ...PersonnelSearchIndexService.generateSearchData(data),
      createdBy: userId,
      updatedBy: userId,
    });

    eventDispatcher.emit({
      id: personnel.id,
      name: EventNames.PERSONNEL_CREATED,
      version: 1,
      source: 'personnel-service',
      occurredAt: new Date(),
      userId,
      workspaceId,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: this.buildDomainEventPayload(personnel, 'Created', userId)
    });

    return personnel;
  }

  async getPersonnel(query: any) {
    const ctx = getRequestContext();
    if (!ctx?.workspaceId) {
      throw new ApiError(401, 'Workspace context is missing');
    }

    query.filters = {
      ...query.filters,
      workspaceId: ctx.workspaceId
    };

    return PersonnelRepository.findAll(query);
  }

  async getPersonnelById(id: string): Promise<Personnel> {
    const ctx = getRequestContext();
    const personnel = await PersonnelRepository.findById(id);

    if (!personnel || personnel.workspaceId !== ctx?.workspaceId) {
      throw new ApiError(404, 'Personnel not found in this workspace');
    }

    return personnel;
  }

  async getPersonnelProfile(id: string): Promise<any> {
    const ctx = getRequestContext();
    if (!ctx?.workspaceId) {
      throw new ApiError(401, 'Workspace context is missing');
    }

    const profile = await PersonnelRepository.findProfile(id);
    if (!profile || profile.workspaceId !== ctx.workspaceId) {
      throw new ApiError(404, 'Personnel not found in this workspace');
    }

    const statistics = PersonnelStatisticsService.calculate(profile);
    const { educations, experiences, skk, documents, tenderDocuments, assignments, embeddings, ...personnel } = profile;

    return {
      personnel,
      educations: educations || [],
      experiences: experiences || [],
      skk: skk || [],
      documents: documents || [],
      tenderDocuments: tenderDocuments || [],
      assignments: assignments || [],
      embeddings: embeddings || [],
      statistics
    };
  }

  async updatePersonnel(id: string, data: any): Promise<Personnel> {
    const ctx = getRequestContext();
    const workspaceId = ctx?.workspaceId;
    const userId = ctx?.userId;

    const personnel = await PersonnelRepository.findById(id, true);

    if (!personnel || personnel.workspaceId !== workspaceId) {
      throw new ApiError(404, 'Personnel not found in this workspace');
    }

    if (personnel.deletedAt) {
      throw new ApiError(400, 'Cannot update deleted personnel');
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

    if (updateData.fullName || updateData.employeeNumber || updateData.nik || updateData.email) {
      const currentPersonnel = personnel;
      const searchData = PersonnelSearchIndexService.generateSearchData({
        fullName: updateData.fullName || currentPersonnel.fullName,
        nik: updateData.nik || currentPersonnel.nik,
        employeeNumber: updateData.employeeNumber || currentPersonnel.employeeNumber,
        email: updateData.email || currentPersonnel.email
      });
      Object.assign(updateData, searchData);
    }

    let updatedPersonnel: Personnel;
    try {
      updatedPersonnel = await PersonnelRepository.updateWithVersion(id, expectedVersion, updateData, userId || 'system');
    } catch (error: any) {
      if (error.message === 'VERSION_CONFLICT') {
        throw new ApiError(409, 'Personnel has been modified by another user.', 'VERSION_CONFLICT');
      }
      throw error;
    }

    eventDispatcher.emit({
      id: updatedPersonnel.id,
      name: EventNames.PERSONNEL_UPDATED,
      version: 1,
      source: 'personnel-service',
      occurredAt: new Date(),
      userId,
      workspaceId,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: this.buildDomainEventPayload(updatedPersonnel, 'Updated', userId)
    });

    return updatedPersonnel;
  }

  async deletePersonnel(id: string): Promise<Personnel> {
    const ctx = getRequestContext();
    const workspaceId = ctx?.workspaceId;
    const userId = ctx?.userId;

    const personnel = await PersonnelRepository.findById(id, true);

    if (!personnel || personnel.workspaceId !== workspaceId) {
      throw new ApiError(404, 'Personnel not found in this workspace');
    }

    if (personnel.deletedAt) {
      throw new ApiError(400, 'Personnel is already deleted');
    }

    const deletedPersonnel = await PersonnelRepository.softDelete(id, userId || 'system');

    eventDispatcher.emit({
      id: deletedPersonnel.id,
      name: EventNames.PERSONNEL_DELETED,
      version: 1,
      source: 'personnel-service',
      occurredAt: new Date(),
      userId,
      workspaceId,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: this.buildDomainEventPayload(deletedPersonnel, 'Deleted', userId)
    });

    return deletedPersonnel;
  }

  async restorePersonnel(id: string): Promise<Personnel> {
    const ctx = getRequestContext();
    const workspaceId = ctx?.workspaceId;
    const userId = ctx?.userId;

    const personnel = await PersonnelRepository.findById(id, true);

    if (!personnel || personnel.workspaceId !== workspaceId) {
      throw new ApiError(404, 'Personnel not found in this workspace');
    }

    if (!personnel.deletedAt) {
      throw new ApiError(400, 'Personnel is not deleted');
    }

    const restoredPersonnel = await PersonnelRepository.restore(id, userId || 'system');

    eventDispatcher.emit({
      id: restoredPersonnel.id,
      name: EventNames.PERSONNEL_RESTORED,
      version: 1,
      source: 'personnel-service',
      occurredAt: new Date(),
      userId,
      workspaceId,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: this.buildDomainEventPayload(restoredPersonnel, 'Restored', userId)
    });

    return restoredPersonnel;
  }
}

export default new PersonnelService();
