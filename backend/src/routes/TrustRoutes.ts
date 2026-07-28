import { Router } from 'express';
import { TrustController } from '../controllers/TrustController';

export const trustRouter = Router();
const trustController = new TrustController();

// Generic trust routes based on EntityType
trustRouter.get('/:entityType/:entityId/trust', trustController.getTrustProjection);
trustRouter.get('/:entityType/:entityId/evidence', trustController.getEvidenceList);
trustRouter.post('/:entityType/:entityId/verification/request', trustController.requestVerification);

// Reviewer Actions
trustRouter.put('/evidence/:id/verify', trustController.verifyEvidence);
