import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validate } from '../middleware/validate';
import { LoginRequestSchema } from '../schemas/auth.schema';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/login', validate(LoginRequestSchema), AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);
router.get('/me', authenticate, AuthController.me);

export default router;
