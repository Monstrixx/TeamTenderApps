import { Router } from 'express';
import { SystemController } from '../controllers/SystemController';
import authRoutes from './auth.routes';
import workspaceRoutes from './workspace.routes';
import companyRoutes from './company.routes';
import supplierRoutes from './supplier.routes';
import personnelRoutes from './personnel.routes';
import { HealthController } from '../controllers/HealthController';

import { globalRouter as globalInvitationRouter } from './workspace-invitations.routes';
import { workspaceMiddleware } from '../middleware/workspace.middleware';

import publicCompanyRoutes from './public.company.routes';
import { trustRouter } from './TrustRoutes';

const router = Router();

router.get('/health', SystemController.health);
router.get('/version', SystemController.version);
router.get('/metrics', HealthController.getMetrics);
router.use('/auth', authRoutes);
router.use('/workspaces', workspaceRoutes);
router.use('/workspace-invitations', globalInvitationRouter);

// Public Routes
router.use('/public/companies', publicCompanyRoutes);

// Protected Workspace-scoped Routes
router.use('/companies', workspaceMiddleware, companyRoutes);
router.use('/suppliers', workspaceMiddleware, supplierRoutes);
router.use('/personnels', workspaceMiddleware, personnelRoutes);
router.use('/trust', workspaceMiddleware, trustRouter);

export default router;
