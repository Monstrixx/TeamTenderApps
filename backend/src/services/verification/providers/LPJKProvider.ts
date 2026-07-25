import { ICredentialProvider, VerificationResult } from './ICredentialProvider';
import { ProviderType, VerificationStatus } from '@prisma/client';

export class LPJKProvider implements ICredentialProvider {
  async verify(certificateNumber: string, metadata?: any): Promise<VerificationResult> {
    // In a real implementation, this would call the LPJK/PUPR SIKI API
    // e.g. const response = await axios.get(`https://siki.pu.go.id/api/v1/skk/${certificateNumber}`);
    
    // For now, return a mock response that matches the new VerificationResult structure
    return {
      status: VerificationStatus.VERIFIED,
      provider: ProviderType.LPJK,
      verifiedAt: new Date(),
      expiredAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      certificateNumber: certificateNumber,
      referenceNumber: `LPJK-REF-${Date.now()}`,
      confidence: 0.95, // High confidence for API integration
      message: 'Verified successfully via LPJK mock adapter',
      rawResponse: {
        certificateNo: certificateNumber,
        status: 'ACTIVE',
        name: metadata?.name || 'Unknown',
        qualification: 'Ahli Muda',
        issuedAt: new Date().toISOString(),
      }
    };
  }
}
