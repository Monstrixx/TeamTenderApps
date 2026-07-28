import { Request, Response } from 'express';
import { TrustEvidenceService } from '../services/TrustEvidenceService';
import { TrustEngineService } from '../services/TrustEngineService';
import { TrustProjectionRepository } from '../repositories/TrustProjectionRepository';
import { TrustEvidenceRepository } from '../repositories/TrustEvidenceRepository';
import { EntityType } from '@prisma/client';

export class TrustController {
  private evidenceService = new TrustEvidenceService();
  private engineService = new TrustEngineService();
  private projectionRepo = new TrustProjectionRepository();
  private evidenceRepo = new TrustEvidenceRepository();

  public getTrustProjection = async (req: Request, res: Response): Promise<void> => {
    try {
      const entityType = req.params.entityType as EntityType;
      const entityId = req.params.entityId as string;
      
      let projection = await this.projectionRepo.findByEntity(entityType, entityId);
      if (!projection) {
        // Compute it if it doesn't exist
        projection = await this.engineService.calculateProjection(entityType, entityId);
      }
      
      res.json(projection);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public requestVerification = async (req: Request, res: Response): Promise<void> => {
    try {
      const entityType = req.params.entityType as EntityType;
      const entityId = req.params.entityId as string;
      const { type, title, description, assetId, workspaceId } = req.body;
      const actorId = (req as any).user?.id || 'SYSTEM'; // assuming authenticated user

      const evidence = await this.evidenceService.requestVerification(
        entityType,
        entityId,
        { type, title, description, assetId, workspaceId },
        actorId
      );

      res.status(201).json(evidence);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public getEvidenceList = async (req: Request, res: Response): Promise<void> => {
    try {
      const entityType = req.params.entityType as EntityType;
      const entityId = req.params.entityId as string;
      const evidence = await this.evidenceRepo.findByEntity(entityType, entityId);
      res.json(evidence);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Admin / Reviewer action
  public verifyEvidence = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const { notes } = req.body;
      const actorId = (req as any).user?.id || 'REVIEWER';

      const updated = await this.evidenceService.verifyEvidence(id, actorId, notes);
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
