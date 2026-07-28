import { WorkspaceRole, WorkspaceRoleType } from '@prisma/client';
import WorkspaceRoleRepository from '../repositories/WorkspaceRoleRepository';
import { ApiError } from '../common/responses/ApiError';

export class WorkspaceRoleService {
  async listRoles(): Promise<WorkspaceRole[]> {
    const result = await WorkspaceRoleRepository.findAll({ page: 1, limit: 100 });
    return result.data;
  }

  async getRole(id: string): Promise<WorkspaceRole> {
    const role = await WorkspaceRoleRepository.findById(id);
    if (!role) {
      throw ApiError.notFound('Workspace role not found');
    }
    return role;
  }
}

export default new WorkspaceRoleService();
