import { WorkspaceMember, MemberStatus } from '@prisma/client';
import WorkspaceMemberRepository from '../repositories/WorkspaceMemberRepository';
import WorkspaceRoleService from './WorkspaceRoleService';
import { ApiError } from '../common/responses/ApiError';
import { QueryResult } from '../common/query/QueryResult';

export class WorkspaceMemberService {
  async listMembers(workspaceId: string, query: any): Promise<QueryResult<WorkspaceMember>> {
    return WorkspaceMemberRepository.findAll({
      ...query,
      filters: { ...query.filters, workspaceId }
    });
  }

  async getMember(workspaceId: string, userId: string): Promise<WorkspaceMember> {
    const member = await WorkspaceMemberRepository.findByWorkspaceAndUser(workspaceId, userId);
    if (!member) {
      throw ApiError.notFound('Member not found in this workspace');
    }
    return member;
  }

  async changeRole(workspaceId: string, memberId: string, roleId: string): Promise<WorkspaceMember> {
    const member = await WorkspaceMemberRepository.findById(memberId);
    if (!member || member.workspaceId !== workspaceId) {
      throw ApiError.notFound('Member not found');
    }

    // Verify role exists
    await WorkspaceRoleService.getRole(roleId);

    return WorkspaceMemberRepository.update(memberId, { role: { connect: { id: roleId } } });
  }

  async updateStatus(workspaceId: string, memberId: string, status: MemberStatus): Promise<WorkspaceMember> {
    const member = await WorkspaceMemberRepository.findById(memberId);
    if (!member || member.workspaceId !== workspaceId) {
      throw ApiError.notFound('Member not found');
    }

    return WorkspaceMemberRepository.update(memberId, { status });
  }

  async removeMember(workspaceId: string, memberId: string): Promise<void> {
    const member = await WorkspaceMemberRepository.findById(memberId);
    if (!member || member.workspaceId !== workspaceId) {
      throw ApiError.notFound('Member not found');
    }
    
    // Soft delete
    await WorkspaceMemberRepository.update(memberId, { 
      status: MemberStatus.DEACTIVATED,
      deletedAt: new Date()
    });
  }
}

export default new WorkspaceMemberService();
