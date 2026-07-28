import { Request, Response, NextFunction } from 'express';
import WorkspaceInvitationService from '../services/WorkspaceInvitationService';
import { AuthRequest } from '../middleware/auth';

export class WorkspaceInvitationController {
  static async listInvitations(req: Request, res: Response, next: NextFunction) {
    try {
      const workspaceId = req.params.workspaceId as string;
      const result = await WorkspaceInvitationService.listInvitations(workspaceId, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async invite(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const workspaceId = req.params.workspaceId as string;
      const inviterId = req.user!.id;
      const result = await WorkspaceInvitationService.invite(workspaceId, inviterId, req.body);
      res.status(201).json({ message: 'Invitation sent successfully', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async revoke(req: Request, res: Response, next: NextFunction) {
    try {
      const workspaceId = req.params.workspaceId as string;
      const invitationId = req.params.invitationId as string;
      const result = await WorkspaceInvitationService.revoke(workspaceId, invitationId);
      res.json({ message: 'Invitation revoked successfully', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async accept(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const token = req.params.token as string;
      const userId = req.user!.id;
      await WorkspaceInvitationService.accept(token, userId);
      res.json({ message: 'Invitation accepted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export default WorkspaceInvitationController;
