import { Router } from 'express';
import WorkspaceController from '../controllers/WorkspaceController';
import { authenticate, requirePermission } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { 
  createWorkspaceSchema, 
  updateWorkspaceSchema, 
  workspaceIdParamSchema, 
  workspaceQuerySchema 
} from '../schemas/workspace.schema';
import workspaceMembersRoutes from './workspace-members.routes';
import { workspaceSpecificRouter as workspaceInvitationsRoutes } from './workspace-invitations.routes';
import { workspaceMiddleware } from '../middleware/workspace.middleware';

const router = Router();

router.use('/:workspaceId/members', authenticate, workspaceMiddleware, workspaceMembersRoutes);
router.use('/:workspaceId/invitations', authenticate, workspaceMiddleware, workspaceInvitationsRoutes);

router.get(
  '/',
  authenticate,
  requirePermission(['workspace.read']),
  validate(workspaceQuerySchema),
  WorkspaceController.listWorkspaces
);

router.post(
  '/',
  authenticate,
  requirePermission(['workspace.create']),
  validate(createWorkspaceSchema),
  WorkspaceController.createWorkspace
);

router.get(
  '/:id',
  authenticate,
  requirePermission(['workspace.read']),
  validate(workspaceIdParamSchema),
  WorkspaceController.getWorkspace
);

router.put(
  '/:id',
  authenticate,
  requirePermission(['workspace.update']),
  validate(updateWorkspaceSchema),
  WorkspaceController.updateWorkspace
);

router.delete(
  '/:id',
  authenticate,
  requirePermission(['workspace.delete']),
  validate(workspaceIdParamSchema),
  WorkspaceController.deleteWorkspace
);

router.post(
  '/:id/restore',
  authenticate,
  requirePermission(['workspace.restore']),
  validate(workspaceIdParamSchema),
  WorkspaceController.restoreWorkspace
);

export default router;
