import { Router } from 'express';
import WorkspaceInvitationController from '../controllers/WorkspaceInvitationController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { workspaceInvitationSchema, workspaceInvitationAcceptSchema } from '../schemas/workspace-member.schema';

const workspaceSpecificRouter = Router({ mergeParams: true });
const globalRouter = Router();

// /workspaces/:workspaceId/invitations
workspaceSpecificRouter.get('/', authenticate, WorkspaceInvitationController.listInvitations);

workspaceSpecificRouter.post(
  '/',
  authenticate,
  validate(workspaceInvitationSchema),
  WorkspaceInvitationController.invite
);

workspaceSpecificRouter.post(
  '/:invitationId/revoke',
  authenticate,
  WorkspaceInvitationController.revoke
);

// /workspace-invitations/:token
globalRouter.post(
  '/:token/accept',
  authenticate,
  validate(workspaceInvitationAcceptSchema),
  WorkspaceInvitationController.accept
);

export { workspaceSpecificRouter, globalRouter };
