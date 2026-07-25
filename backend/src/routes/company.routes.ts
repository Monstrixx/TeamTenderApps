import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';
import { authenticate, requirePermission } from '../middleware/auth';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

router.get(
  '/',
  requirePermission(['company.read']),
  CompanyController.getAll
);

router.post(
  '/',
  requirePermission(['company.create']),
  CompanyController.create
);

router.get(
  '/:id',
  requirePermission(['company.read']),
  CompanyController.getById
);

router.get(
  '/:id/profile',
  requirePermission(['company.read']),
  CompanyController.getProfile
);

router.put(
  '/:id',
  requirePermission(['company.update']),
  CompanyController.update
);

router.delete(
  '/:id',
  requirePermission(['company.delete']),
  CompanyController.remove
);

router.post(
  '/:id/restore',
  requirePermission(['company.restore']),
  CompanyController.restore
);

export default router;
