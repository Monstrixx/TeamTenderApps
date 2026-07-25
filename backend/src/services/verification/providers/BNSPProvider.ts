import { ICredentialProvider, VerificationResult } from './ICredentialProvider';
import { ProviderType, VerificationStatus } from '@prisma/client';

export class BNSPProvider implements ICredentialProvider {
  async verify(certificateNumber: string, metadata?: any): Promise<VerificationResult> {
    return {
      status: VerificationStatus.VERIFIED,
      provider: ProviderType.BNSP,
      verifiedAt: new Date(),
      expiredAt: new Date(Date.now() + 365 * 3 * 24 * 60 * 60 * 1000), // 3 years for BNSP usually
      certificateNumber: certificateNumber,
      referenceNumber: `BNSP-REF-${Date.now()}`,
      confidence: 0.90, 
      message: 'Verified successfully via BNSP mock adapter',
      rawResponse: {
        certificateNo: certificateNumber,
        status: 'ACTIVE',
        name: metadata?.name || 'Unknown',
        issuedAt: new Date().toISOString(),
      }
    };
  }
}
