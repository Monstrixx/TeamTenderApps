import { VerificationStatus, ProviderType } from '@prisma/client';

export interface VerificationResult {
  status: VerificationStatus;
  provider: ProviderType;
  verifiedAt: Date;
  expiredAt?: Date;
  certificateNumber?: string;
  referenceNumber?: string;
  confidence: number;
  message?: string;
  rawResponse?: any;
}

export interface ICredentialProvider {
  /**
   * Verifies a certificate against the provider's source
   */
  verify(certificateNumber: string, metadata?: any): Promise<VerificationResult>;
}
