import { Router } from 'express';
import WorkspaceMemberController from '../controllers/WorkspaceMemberController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { workspaceMemberRoleSchema, workspaceMemberStatusSchema } from '../schemas/workspace-member.schema';

const router = Router({ mergeParams: true }); // Important: to get workspaceId from parent router

// Role endpoints (globalish, but can be under workspaces for simplicity)
router.get('/roles', authenticate, WorkspaceMemberController.listRoles);

// Member endpoints
router.get('/', authenticate, WorkspaceMemberController.listMembers);

router.put(
  '/:memberId/role',
  authenticate,
  validate(workspaceMemberRoleSchema),
  WorkspaceMemberController.changeRole
);

router.put(
  '/:memberId/status',
  authenticate,
  validate(workspaceMemberStatusSchema),
  WorkspaceMemberController.updateStatus
);

router.delete(
  '/:memberId',
  authenticate,
  WorkspaceMemberController.removeMember
);

export default router;
