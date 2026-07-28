import { TrustEvidence, EntityType, TrustVerificationStatus, TrustProjection } from '@prisma/client';
import { TrustEvidenceRepository } from '../repositories/TrustEvidenceRepository';
import { TrustProjectionRepository } from '../repositories/TrustProjectionRepository';

export interface TrustRuleConfig {
  evidenceType: string;
  weight: number;
}

// Temporary hardcoded rules, usually this would come from a database or config file
const DEFAULT_COMPANY_RULES: TrustRuleConfig[] = [
  { evidenceType: 'NIB', weight: 25 },
  { evidenceType: 'NPWP', weight: 20 },
  { evidenceType: 'SBU', weight: 20 },
  { evidenceType: 'CONTACT', weight: 10 },
  { evidenceType: 'BANK', weight: 10 },
  { evidenceType: 'PROFILE', weight: 15 }, // E.g., basic profile completeness
];

export class TrustEngineService {
  private evidenceRepo = new TrustEvidenceRepository();
  private projectionRepo = new TrustProjectionRepository();

  async calculateProjection(entityType: EntityType, entityId: string): Promise<TrustProjection> {
    const evidenceList = await this.evidenceRepo.findByEntity(entityType, entityId);
    
    let totalScore = 0;
    const verifiedItems: string[] = [];
    const expiredItems: string[] = [];
    const warnings: string[] = [];
    const badges: string[] = [];

    // Assuming we use company rules for now. Can be extended based on entityType
    const rules = entityType === 'COMPANY' ? DEFAULT_COMPANY_RULES : [];

    evidenceList.forEach(evidence => {
      const isVerified = evidence.status === 'VERIFIED';
      const isExpired = evidence.status === 'EXPIRED';

      if (isVerified) {
        verifiedItems.push(evidence.type);
        
        // Find rule weight
        const rule = rules.find(r => r.evidenceType === evidence.type);
        if (rule) {
          totalScore += rule.weight;
        }

        // Logic for Badges
        if (evidence.type === 'NIB' || evidence.type === 'NPWP') {
          if (!badges.includes('Verified Legal')) badges.push('Verified Legal');
        }
        if (evidence.type === 'SBU' || evidence.type === 'LPJK') {
          if (!badges.includes('Verified LPJK')) badges.push('Verified LPJK');
        }
        if (evidence.type === 'ISO') {
          if (!badges.includes('Verified ISO')) badges.push('Verified ISO');
        }
        if (evidence.type === 'BANK') {
          if (!badges.includes('Verified Bank')) badges.push('Verified Bank');
        }
        if (evidence.type === 'CONTACT') {
          if (!badges.includes('Verified Contact')) badges.push('Verified Contact');
        }
      } else if (isExpired) {
        expiredItems.push(evidence.type);
        warnings.push(`${evidence.type} evidence has expired.`);
      }
    });

    // If score is 100 or above a threshold, general Verified Company badge
    if (totalScore >= 70 && !badges.includes('Verified Company')) {
      badges.push('Verified Company');
    }

    // Determine overall status
    let overallStatus: TrustVerificationStatus = 'DRAFT';
    if (totalScore >= 70) overallStatus = 'VERIFIED';
    else if (totalScore > 0) overallStatus = 'UNDER_REVIEW';

    // Update projection
    const projection = await this.projectionRepo.upsert(entityType, entityId, {
      status: overallStatus,
      score: totalScore,
      verifiedItems,
      expiredItems,
      warnings,
      badges,
      lastCalculatedAt: new Date()
    });

    return projection;
  }
}
