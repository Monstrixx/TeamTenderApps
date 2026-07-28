import { Request, Response, NextFunction } from 'express';
import WorkspaceMemberService from '../services/WorkspaceMemberService';
import WorkspaceRoleService from '../services/WorkspaceRoleService';
import { MemberStatus } from '@prisma/client';

export class WorkspaceMemberController {
  static async listMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const workspaceId = req.params.workspaceId as string;
      const result = await WorkspaceMemberService.listMembers(workspaceId, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async changeRole(req: Request, res: Response, next: NextFunction) {
    try {
      const workspaceId = req.params.workspaceId as string;
      const memberId = req.params.memberId as string;
      const { roleId } = req.body;
      const result = await WorkspaceMemberService.changeRole(workspaceId, memberId, roleId);
      res.json({ message: 'Role updated successfully', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const workspaceId = req.params.workspaceId as string;
      const memberId = req.params.memberId as string;
      const { status } = req.body;
      const result = await WorkspaceMemberService.updateStatus(workspaceId, memberId, status as MemberStatus);
      res.json({ message: 'Status updated successfully', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async removeMember(req: Request, res: Response, next: NextFunction) {
    try {
      const workspaceId = req.params.workspaceId as string;
      const memberId = req.params.memberId as string;
      await WorkspaceMemberService.removeMember(workspaceId, memberId);
      res.json({ message: 'Member removed successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async listRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await WorkspaceRoleService.listRoles();
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  }
}

export default WorkspaceMemberController;
