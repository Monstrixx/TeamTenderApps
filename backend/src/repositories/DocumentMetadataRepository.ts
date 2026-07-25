import { BaseRepository } from '../common/repositories/BaseRepository';
import prisma from '../database/prisma';
import { DocumentMetadata } from '@prisma/client';

class DocumentMetadataRepository extends BaseRepository<DocumentMetadata> {
  constructor() {
    super(prisma.documentMetadata);
  }

  async findByDocumentId(documentId: string): Promise<DocumentMetadata[]> {
    return this.model.findMany({
      where: { documentId }
    });
  }
}

export default new DocumentMetadataRepository();
