import DocumentRepository from '../../repositories/DocumentRepository';
import { Document } from '@prisma/client';

export class DocumentDuplicateService {
  /**
   * Checks if a document with the same SHA256 hash already exists.
   * If it does, returns the existing document.
   */
  async findDuplicate(sha256: string): Promise<Document | null> {
    return DocumentRepository.findBySha256(sha256);
  }
}

export default new DocumentDuplicateService();
