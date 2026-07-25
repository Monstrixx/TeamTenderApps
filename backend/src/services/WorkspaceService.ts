import WorkspaceRepository, { WorkspaceQuery } from '../repositories/WorkspaceRepository';
import { ApiError } from '../common/responses/ApiError';
import { Workspace, Prisma } from '@prisma/client';
import { eventDispatcher } from '../common/events/NodeEventDispatcher';
import { EventNames } from '../common/events/EventNames';
import { getRequestContext } from '../common/context/RequestContext';

export class WorkspaceService {
  
  private async generateWorkspaceCode(): Promise<string> {
    const count = await WorkspaceRepository.count();
    const nextId = count + 1;
    return `WS-${nextId.toString().padStart(6, '0')}`;
  }

  async createWorkspace(data: Prisma.WorkspaceCreateInput & { ownerId: string }, userId: string): Promise<Workspace> {
    const code = await this.generateWorkspaceCode();

    const workspace = await WorkspaceRepository.create({
      code,
      name: data.name,
      description: data.description,
      status: data.status,
      owner: { connect: { id: data.ownerId } },
      createdBy: userId,
      updatedBy: userId,
    });

    const ctx = getRequestContext();
    eventDispatcher.emit({
      id: workspace.id,
      name: EventNames.WORKSPACE_CREATED,
      version: 1,
      source: 'workspace-service',
      occurredAt: new Date(),
      userId,
      workspaceId: workspace.id,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: workspace,
    });

    return workspace;
  }

  async getWorkspaces(query: WorkspaceQuery) {
    return WorkspaceRepository.findAll(query);
  }

  async getWorkspaceById(id: string): Promise<Workspace> {
    const workspace = await WorkspaceRepository.findById(id);
    if (!workspace) {
      throw new ApiError(404, 'Workspace not found');
    }
    return workspace;
  }

  async updateWorkspace(id: string, data: Prisma.WorkspaceUpdateInput & { ownerId?: string }, userId: string): Promise<Workspace> {
    const workspace = await WorkspaceRepository.findById(id, true);
    
    if (!workspace) {
      throw new ApiError(404, 'Workspace not found');
    }

    if (workspace.deletedAt) {
      throw new ApiError(400, 'Cannot update a deleted workspace');
    }

    // Code is immutable, we don't pass it to update data
    const updateData: Prisma.WorkspaceUpdateInput = {
      ...data,
      updatedBy: userId,
    };
    
    if (updateData.code) {
      delete updateData.code;
    }

    if (data.ownerId) {
      updateData.owner = { connect: { id: data.ownerId } };
    }

    const updatedWorkspace = await WorkspaceRepository.update(id, updateData);

    const ctx = getRequestContext();
    eventDispatcher.emit({
      id: updatedWorkspace.id,
      name: EventNames.WORKSPACE_UPDATED,
      version: 1,
      source: 'workspace-service',
      occurredAt: new Date(),
      userId,
      workspaceId: updatedWorkspace.id,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: updatedWorkspace,
    });

    return updatedWorkspace;
  }

  async deleteWorkspace(id: string, userId: string): Promise<Workspace> {
    const workspace = await WorkspaceRepository.findById(id, true);
    
    if (!workspace) {
      throw new ApiError(404, 'Workspace not found');
    }

    if (workspace.deletedAt) {
      throw new ApiError(400, 'Workspace is already deleted');
    }

    const deletedWorkspace = await WorkspaceRepository.softDelete(id, userId);

    const ctx = getRequestContext();
    eventDispatcher.emit({
      id: deletedWorkspace.id,
      name: EventNames.WORKSPACE_DELETED,
      version: 1,
      source: 'workspace-service',
      occurredAt: new Date(),
      userId,
      workspaceId: deletedWorkspace.id,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: deletedWorkspace,
    });

    return deletedWorkspace;
  }

  async restoreWorkspace(id: string, userId: string): Promise<Workspace> {
    const workspace = await WorkspaceRepository.findById(id, true);
    
    if (!workspace) {
      throw new ApiError(404, 'Workspace not found');
    }

    if (!workspace.deletedAt) {
      throw new ApiError(400, 'Workspace is not deleted');
    }

    const restoredWorkspace = await WorkspaceRepository.restore(id, userId);

    const ctx = getRequestContext();
    eventDispatcher.emit({
      id: restoredWorkspace.id,
      name: EventNames.WORKSPACE_RESTORED,
      version: 1,
      source: 'workspace-service',
      occurredAt: new Date(),
      userId,
      workspaceId: restoredWorkspace.id,
      requestId: ctx?.requestId,
      correlationId: ctx?.correlationId,
      payload: restoredWorkspace,
    });

    return restoredWorkspace;
  }
}

export default new WorkspaceService();
