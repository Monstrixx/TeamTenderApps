import { Router } from 'express';
import { PublicCompanyController } from '../controllers/PublicCompanyController';

const router = Router();

router.get('/:slug', PublicCompanyController.getBySlug);
router.get('/:slug/trust', PublicCompanyController.getCompanyTrust);

export default router;
