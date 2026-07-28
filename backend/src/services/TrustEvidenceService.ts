import { TrustEvidence, EntityType, TrustVerificationStatus, Prisma, CompanyActivityCategory, CompanyVisibility } from '@prisma/client';
import { TrustEvidenceRepository } from '../repositories/TrustEvidenceRepository';
import { TrustAuditLogRepository } from '../repositories/TrustAuditLogRepository';
import { TrustEngineService } from './TrustEngineService';
import prisma from '../database/prisma';

export class TrustEvidenceService {
  private evidenceRepo = new TrustEvidenceRepository();
  private auditRepo = new TrustAuditLogRepository();
  private trustEngine = new TrustEngineService();

  async requestVerification(
    entityType: EntityType, 
    entityId: string, 
    data: {
      type: string;
      title: string;
      description?: string;
      assetId?: string;
      workspaceId?: string;
    },
    actorId: string
  ): Promise<TrustEvidence> {
    const evidence = await this.evidenceRepo.create({
      entityType,
      entityId,
      type: data.type,
      title: data.title,
      description: data.description,
      assetId: data.assetId,
      workspaceId: data.workspaceId,
      status: 'REQUESTED'
    });

    await this.auditRepo.log({
      entityType,
      entityId,
      evidenceId: evidence.id,
      actorId,
      action: 'REQUEST_VERIFICATION',
      newState: 'REQUESTED'
    });

    await this.trustEngine.calculateProjection(entityType, entityId);
    
    // Create Activity if it's a company
    if (entityType === 'COMPANY') {
      await prisma.companyActivity.create({
        data: {
          companyId: entityId,
          title: `Verification Requested: ${data.title}`,
          category: 'CERTIFICATION',
          date: new Date(),
          visibility: 'PUBLIC',
          relatedEntityType: 'TRUST_EVIDENCE',
          relatedEntityId: evidence.id,
          metadata: { type: data.type }
        }
      });
    }

    return evidence;
  }

  async verifyEvidence(id: string, reviewerId: string, notes?: string): Promise<TrustEvidence> {
    const evidence = await this.evidenceRepo.findById(id);
    if (!evidence) throw new Error("Evidence not found");

    const updated = await this.evidenceRepo.update(id, {
      status: 'VERIFIED',
      reviewerId,
      verificationResult: { notes, verifiedAt: new Date().toISOString() }
    });

    await this.auditRepo.log({
      entityType: updated.entityType,
      entityId: updated.entityId,
      evidenceId: id,
      actorId: reviewerId,
      action: 'VERIFY_EVIDENCE',
      previousState: evidence.status,
      newState: 'VERIFIED',
      reason: notes
    });

    await this.trustEngine.calculateProjection(updated.entityType, updated.entityId);

    if (updated.entityType === 'COMPANY') {
      await prisma.companyActivity.create({
        data: {
          companyId: updated.entityId,
          title: `Verification Approved: ${updated.title}`,
          category: 'CERTIFICATION',
          date: new Date(),
          visibility: 'PUBLIC',
          relatedEntityType: 'TRUST_EVIDENCE',
          relatedEntityId: updated.id,
          metadata: { type: updated.type }
        }
      });
    }

    return updated;
  }

  async rejectEvidence(id: string, reviewerId: string, reason: string): Promise<TrustEvidence> {
    const evidence = await this.evidenceRepo.findById(id);
    if (!evidence) throw new Error("Evidence not found");

    const updated = await this.evidenceRepo.update(id, {
      status: 'REVOKED',
      reviewerId,
      verificationResult: { reason, revokedAt: new Date().toISOString() }
    });

    await this.auditRepo.log({
      entityType: updated.entityType,
      entityId: updated.entityId,
      evidenceId: id,
      actorId: reviewerId,
      action: 'REJECT_EVIDENCE',
      previousState: evidence.status,
      newState: 'REVOKED',
      reason
    });

    await this.trustEngine.calculateProjection(updated.entityType, updated.entityId);

    if (updated.entityType === 'COMPANY') {
      await prisma.companyActivity.create({
        data: {
          companyId: updated.entityId,
          title: `Verification Rejected: ${updated.title}`,
          category: 'CERTIFICATION',
          date: new Date(),
          visibility: 'PUBLIC',
          relatedEntityType: 'TRUST_EVIDENCE',
          relatedEntityId: updated.id,
          metadata: { type: updated.type, reason }
        }
      });
    }

    return updated;
  }
}
