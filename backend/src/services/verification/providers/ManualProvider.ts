import { ICredentialProvider, VerificationResult } from './ICredentialProvider';
import { ProviderType, VerificationStatus } from '@prisma/client';

export class ManualProvider implements ICredentialProvider {
  async verify(certificateNumber: string, metadata?: any): Promise<VerificationResult> {
    return {
      status: VerificationStatus.PENDING,
      provider: ProviderType.MANUAL,
      verifiedAt: new Date(),
      certificateNumber: certificateNumber,
      referenceNumber: `MANUAL-REF-${Date.now()}`,
      confidence: 0.50, // Manual requires human operator
      message: 'Pending manual verification by operator',
      rawResponse: {
        certificateNo: certificateNumber,
        status: 'PENDING_OPERATOR_REVIEW',
        submittedAt: new Date().toISOString(),
      }
    };
  }
}
