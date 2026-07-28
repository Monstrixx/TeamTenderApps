import { Request, Response, NextFunction } from 'express';
import { getRequestContext } from '../common/context/RequestContext';
import { WorkspaceMemberRepository } from '../repositories/WorkspaceMemberRepository';
import { ApiError } from '../common/responses/ApiError';
import { MemberStatus } from '@prisma/client';

export const workspaceMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ctx = getRequestContext();
    
    if (!ctx) {
      throw ApiError.internal('RequestContext is not initialized');
    }

    if (!ctx.userId) {
      throw ApiError.unauthorized('User must be authenticated before workspace context can be resolved');
    }

    // Attempt to extract workspaceId from different sources
    let workspaceId = (req.params.workspaceId as string) || (req.header('x-workspace-id') as string) || ctx.workspaceId;

    if (!workspaceId) {
      // If it's still missing, it means the route requires it but client didn't provide it
      throw ApiError.badRequest('Workspace ID is required for this operation');
    }

    // Verify membership
    const member = await WorkspaceMemberRepository.findByWorkspaceAndUser(workspaceId, ctx.userId);
    
    if (!member) {
      throw ApiError.forbidden('You are not a member of this workspace');
    }

    if (member.status !== MemberStatus.ACTIVE) {
      throw ApiError.forbidden(`Your membership status is ${member.status}. Only active members can perform operations.`);
    }

    // Update Context
    ctx.workspaceId = workspaceId;
    ctx.role = (member as any).role?.type || null;
    ctx.permissions = (member as any).role?.permissions || [];

    next();
  } catch (error) {
    next(error);
  }
};
