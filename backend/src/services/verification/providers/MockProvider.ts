import { ICredentialProvider, VerificationResult } from './ICredentialProvider';
import { ProviderType, VerificationStatus } from '@prisma/client';

export class MockProvider implements ICredentialProvider {
  async verify(certificateNumber: string, metadata?: any): Promise<VerificationResult> {
    const isSuccess = certificateNumber.length % 2 === 0;
    return {
      status: isSuccess ? VerificationStatus.VERIFIED : VerificationStatus.FAILED,
      provider: ProviderType.MOCK,
      verifiedAt: new Date(),
      certificateNumber: certificateNumber,
      referenceNumber: `MOCK-REF-${Date.now()}`,
      confidence: 1.0, 
      message: isSuccess ? 'Mock verification succeeded' : 'Mock verification failed',
      rawResponse: {
        certificateNo: certificateNumber,
        status: isSuccess ? 'ACTIVE' : 'INVALID',
        name: metadata?.name || 'Unknown',
      }
    };
  }
}
