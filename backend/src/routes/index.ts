import { Router } from 'express';
import { SystemController } from '../controllers/SystemController';
import authRoutes from './auth.routes';
import workspaceRoutes from './workspace.routes';
import companyRoutes from './company.routes';
import supplierRoutes from './supplier.routes';
import personnelRoutes from './personnel.routes';
import { HealthController } from '../controllers/HealthController';

const router = Router();

router.get('/health', SystemController.health);
router.get('/version', SystemController.version);
router.get('/metrics', HealthController.getMetrics);
router.use('/auth', authRoutes);
router.use('/workspaces', workspaceRoutes);
router.use('/companies', companyRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/personnels', personnelRoutes);

export default router;
