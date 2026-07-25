import { ProviderType } from '@prisma/client';
import { ICredentialProvider, VerificationResult } from './providers/ICredentialProvider';
import { LPJKProvider } from './providers/LPJKProvider';
import { BNSPProvider } from './providers/BNSPProvider';
import { PUPRProvider } from './providers/PUPRProvider';
import { ManualProvider } from './providers/ManualProvider';
import { MockProvider } from './providers/MockProvider';
import { ApiError } from '../../common/responses/ApiError';

export class PersonnelCredentialVerificationService {
  private static providers: Map<ProviderType, ICredentialProvider> = new Map([
    [ProviderType.LPJK, new LPJKProvider()],
    [ProviderType.BNSP, new BNSPProvider()],
    [ProviderType.PUPR, new PUPRProvider()],
    [ProviderType.MANUAL, new ManualProvider()],
    [ProviderType.MOCK, new MockProvider()]
  ]);

  /**
   * Verifies a certificate using the specified provider type.
   */
  public static async verify(
    providerType: ProviderType, 
    certificateNumber: string, 
    metadata?: any
  ): Promise<VerificationResult> {
    const provider = this.providers.get(providerType);
    
    if (!provider) {
      throw ApiError.badRequest(`Verification provider ${providerType} is not supported or misconfigured`);
    }

    return provider.verify(certificateNumber, metadata);
  }
}
