import { DocumentStorageProvider } from '@prisma/client';

export interface StorageMetadata {
  provider: DocumentStorageProvider;
  providerVersion?: string;
  storageKey: string;
  url?: string;
}

export interface IStorageProvider {
  /**
   * Type of the storage provider
   */
  readonly type: DocumentStorageProvider;

  /**
   * Current version of the provider interface/SDK (e.g., 's3-v3', 'gcs-v2')
   */
  readonly version: string;

  /**
   * Upload a file buffer to storage
   * @param buffer File contents
   * @param key Desired storage key/path
   * @param mimeType MIME type of the file
   */
  upload(buffer: Buffer, key: string, mimeType: string): Promise<StorageMetadata>;

  /**
   * Retrieve a file from storage
   * @param key Storage key
   */
  download(key: string): Promise<Buffer>;

  /**
   * Delete a file from storage
   * @param key Storage key
   */
  delete(key: string): Promise<void>;

  /**
   * Generate a signed URL for temporary access
   * @param key Storage key
   * @param expiresInSeconds Expiration time
   */
  getSignedUrl(key: string, expiresInSeconds: number): Promise<string>;
}
