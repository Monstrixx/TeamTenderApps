import { EquipmentCertification, VerificationStatus } from '@prisma/client';

export type CertificationHealth = 'VALID' | 'NEAR_EXPIRY' | 'EXPIRED' | 'NOT_VERIFIED';

export class EquipmentCertificationHealthService {
  /**
   * Evaluates the health of a certification based on expiration date and verification status.
   * Near expiry is considered within 60 days.
   */
  getHealthStatus(certification: EquipmentCertification): CertificationHealth {
    if (certification.verificationStatus !== VerificationStatus.VERIFIED) {
      return 'NOT_VERIFIED';
    }

    const now = new Date();
    const expiry = new Date(certification.expiredDate);
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysUntilExpiry = (expiry.getTime() - now.getTime()) / msPerDay;

    if (daysUntilExpiry < 0) {
      return 'EXPIRED';
    } else if (daysUntilExpiry <= 60) {
      return 'NEAR_EXPIRY';
    } else {
      return 'VALID';
    }
  }
}

export default new EquipmentCertificationHealthService();
