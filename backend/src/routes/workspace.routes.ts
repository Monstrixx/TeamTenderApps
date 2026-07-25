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

const router = Router();

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
