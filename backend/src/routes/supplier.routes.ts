import { Router } from 'express';
import SupplierController from '../controllers/SupplierController';
import { authenticate, requirePermission } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { 
  CreateSupplierSchema, 
  UpdateSupplierSchema, 
  SupplierIdParamSchema, 
  SupplierQuerySchema,
  ContactPrimarySchema,
  BankPrimarySchema
} from '../schemas/supplier.schema';

const router = Router();

router.get(
  '/',
  authenticate,
  requirePermission(['supplier.read']),
  validate(SupplierQuerySchema),
  SupplierController.listSuppliers
);

router.post(
  '/',
  authenticate,
  requirePermission(['supplier.create']),
  validate(CreateSupplierSchema),
  SupplierController.createSupplier
);

router.get(
  '/:id',
  authenticate,
  requirePermission(['supplier.read']),
  validate(SupplierIdParamSchema),
  SupplierController.getSupplier
);

router.get(
  '/:id/profile',
  authenticate,
  requirePermission(['supplier.read']),
  validate(SupplierIdParamSchema),
  SupplierController.getSupplierProfile
);

router.put(
  '/:id',
  authenticate,
  requirePermission(['supplier.update']),
  validate(UpdateSupplierSchema),
  SupplierController.updateSupplier
);

router.delete(
  '/:id',
  authenticate,
  requirePermission(['supplier.delete']),
  validate(SupplierIdParamSchema),
  SupplierController.deleteSupplier
);

router.post(
  '/:id/restore',
  authenticate,
  requirePermission(['supplier.restore']),
  validate(SupplierIdParamSchema),
  SupplierController.restoreSupplier
);

router.patch(
  '/:id/primary-contact',
  authenticate,
  requirePermission(['supplier.update']),
  validate(ContactPrimarySchema),
  SupplierController.setPrimaryContact
);

router.patch(
  '/:id/primary-bank',
  authenticate,
  requirePermission(['supplier.update']),
  validate(BankPrimarySchema),
  SupplierController.setPrimaryBankAccount
);

export default router;
