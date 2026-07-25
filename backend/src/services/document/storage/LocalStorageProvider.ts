import { IStorageProvider, StorageMetadata } from './IStorageProvider';
import { DocumentStorageProvider } from '@prisma/client';
import * as fs from 'fs/promises';
import * as path from 'path';

export class LocalStorageProvider implements IStorageProvider {
  readonly type = DocumentStorageProvider.LOCAL;
  readonly version = 'local-v1';
  
  private storageDir: string;

  constructor(storageDir?: string) {
    // In a real app, read from config/env
    this.storageDir = storageDir || path.join(process.cwd(), '.storage', 'documents');
    this.ensureDirectoryExists();
  }

  private async ensureDirectoryExists() {
    try {
      await fs.access(this.storageDir);
    } catch {
      await fs.mkdir(this.storageDir, { recursive: true });
    }
  }

  async upload(buffer: Buffer, key: string, mimeType: string): Promise<StorageMetadata> {
    const fullPath = path.join(this.storageDir, key);
    const dir = path.dirname(fullPath);
    
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
    }

    await fs.writeFile(fullPath, buffer);

    return {
      provider: this.type,
      providerVersion: this.version,
      storageKey: key,
      url: `file://${fullPath}`
    };
  }

  async download(key: string): Promise<Buffer> {
    const fullPath = path.join(this.storageDir, key);
    return fs.readFile(fullPath);
  }

  async delete(key: string): Promise<void> {
    const fullPath = path.join(this.storageDir, key);
    try {
      await fs.unlink(fullPath);
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  async getSignedUrl(key: string, expiresInSeconds: number): Promise<string> {
    const fullPath = path.join(this.storageDir, key);
    // Local storage doesn't really have "signed URLs", but we return a generic path or API endpoint
    return `/api/documents/preview/${encodeURIComponent(key)}`;
  }
}
