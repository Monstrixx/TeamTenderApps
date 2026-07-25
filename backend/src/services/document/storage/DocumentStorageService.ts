import { IStorageProvider } from './IStorageProvider';
import { LocalStorageProvider } from './LocalStorageProvider';
import { DocumentStorageProvider } from '@prisma/client';

export class DocumentStorageService {
  private providers: Map<DocumentStorageProvider, IStorageProvider> = new Map();
  private defaultProvider: DocumentStorageProvider = DocumentStorageProvider.LOCAL;

  constructor() {
    this.registerProvider(new LocalStorageProvider());
  }

  registerProvider(provider: IStorageProvider) {
    this.providers.set(provider.type, provider);
  }

  setDefaultProvider(providerType: DocumentStorageProvider) {
    if (!this.providers.has(providerType)) {
      throw new Error(`Provider ${providerType} is not registered`);
    }
    this.defaultProvider = providerType;
  }

  getProvider(providerType?: DocumentStorageProvider): IStorageProvider {
    const type = providerType || this.defaultProvider;
    const provider = this.providers.get(type);
    if (!provider) {
      throw new Error(`Provider ${type} is not registered`);
    }
    return provider;
  }
}

export default new DocumentStorageService();
