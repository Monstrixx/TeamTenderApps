import { Router } from 'express';
import { PersonnelController } from '../controllers/PersonnelController';
import { authenticate, requirePermission } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createPersonnelSchema, updatePersonnelSchema } from './schemas/personnel.schema';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  requirePermission(['personnel.create']),
  validate(createPersonnelSchema),
  PersonnelController.create
);

router.get(
  '/',
  requirePermission(['personnel.read']),
  PersonnelController.getAll
);

router.get(
  '/:id',
  requirePermission(['personnel.read']),
  PersonnelController.getById
);

router.get(
  '/:id/profile',
  requirePermission(['personnel.read']),
  PersonnelController.getProfile
);

router.put(
  '/:id',
  requirePermission(['personnel.update']),
  validate(updatePersonnelSchema),
  PersonnelController.update
);

router.delete(
  '/:id',
  requirePermission(['personnel.delete']),
  PersonnelController.delete
);

router.post(
  '/:id/restore',
  requirePermission(['personnel.restore']),
  PersonnelController.restore
);

router.post(
  '/skk/:skkId/verify',
  requirePermission(['personnel.verify']),
  PersonnelController.verifySKK
);

export default router;
