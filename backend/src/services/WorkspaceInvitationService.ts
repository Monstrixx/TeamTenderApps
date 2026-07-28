import { WorkspaceInvitation, InvitationStatus, MemberStatus } from '@prisma/client';
import crypto from 'crypto';
import WorkspaceInvitationRepository from '../repositories/WorkspaceInvitationRepository';
import WorkspaceMemberRepository from '../repositories/WorkspaceMemberRepository';
import WorkspaceRoleService from './WorkspaceRoleService';
import { UserRepository } from '../repositories/UserRepository';
import { ApiError } from '../common/responses/ApiError';
import { QueryResult } from '../common/query/QueryResult';

export class WorkspaceInvitationService {
  async listInvitations(workspaceId: string, query: any): Promise<QueryResult<WorkspaceInvitation>> {
    return WorkspaceInvitationRepository.findAll({
      ...query,
      filters: { ...query.filters, workspaceId }
    });
  }

  async invite(workspaceId: string, inviterId: string, data: { email: string; displayName?: string; roleId: string }): Promise<WorkspaceInvitation> {
    // 1. Verify role exists
    await WorkspaceRoleService.getRole(data.roleId);

    // 2. Ensure they aren't already an active member
    const user = await UserRepository.findByEmail(data.email);
    if (user) {
      const existingMember = await WorkspaceMemberRepository.findByWorkspaceAndUser(workspaceId, user.id);
      if (existingMember && existingMember.status === MemberStatus.ACTIVE) {
        throw ApiError.badRequest('User is already an active member of this workspace');
      }
    }

    // 3. Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    // 4. Create invitation
    return WorkspaceInvitationRepository.create({
      workspace: { connect: { id: workspaceId } },
      inviter: { connect: { id: inviterId } },
      role: { connect: { id: data.roleId } },
      email: data.email,
      displayName: data.displayName,
      token,
      expiresAt,
    });
  }

  async revoke(workspaceId: string, invitationId: string): Promise<WorkspaceInvitation> {
    const invitation = await WorkspaceInvitationRepository.findById(invitationId);
    if (!invitation || invitation.workspaceId !== workspaceId) {
      throw ApiError.notFound('Invitation not found');
    }
    if (invitation.status !== InvitationStatus.PENDING) {
      throw ApiError.badRequest('Only pending invitations can be revoked');
    }

    return WorkspaceInvitationRepository.update(invitationId, {
      status: InvitationStatus.REVOKED,
      revokedAt: new Date()
    });
  }

  async accept(token: string, userId: string): Promise<void> {
    const invitation = await WorkspaceInvitationRepository.findByToken(token);
    if (!invitation) {
      throw ApiError.notFound('Invalid invitation token');
    }
    if (invitation.status !== InvitationStatus.PENDING) {
      throw ApiError.badRequest('Invitation is no longer valid');
    }
    if (invitation.expiresAt < new Date()) {
      await WorkspaceInvitationRepository.update(invitation.id, { status: InvitationStatus.EXPIRED });
      throw ApiError.badRequest('Invitation has expired');
    }

    // Verify user matches email
    const user = await UserRepository.findById(userId);
    if (!user || user.email !== invitation.email) {
       throw ApiError.badRequest('User email does not match invitation email');
    }

    // Create member
    await WorkspaceMemberRepository.create({
      workspace: { connect: { id: invitation.workspaceId } },
      user: { connect: { id: userId } },
      role: { connect: { id: invitation.roleId } },
      joinedAt: new Date(),
    });

    // Mark as accepted
    await WorkspaceInvitationRepository.update(invitation.id, {
      status: InvitationStatus.ACCEPTED,
      acceptedAt: new Date()
    });
  }
}

export default new WorkspaceInvitationService();
