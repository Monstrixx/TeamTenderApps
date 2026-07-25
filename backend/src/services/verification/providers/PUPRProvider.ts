import { ICredentialProvider, VerificationResult } from './ICredentialProvider';
import { ProviderType, VerificationStatus } from '@prisma/client';

export class PUPRProvider implements ICredentialProvider {
  async verify(certificateNumber: string, metadata?: any): Promise<VerificationResult> {
    return {
      status: VerificationStatus.VERIFIED,
      provider: ProviderType.PUPR,
      verifiedAt: new Date(),
      expiredAt: new Date(Date.now() + 365 * 3 * 24 * 60 * 60 * 1000),
      certificateNumber: certificateNumber,
      referenceNumber: `PUPR-REF-${Date.now()}`,
      confidence: 0.95, 
      message: 'Verified successfully via PUPR mock adapter',
      rawResponse: {
        certificateNo: certificateNumber,
        status: 'ACTIVE',
        name: metadata?.name || 'Unknown',
        issuedAt: new Date().toISOString(),
      }
    };
  }
}
