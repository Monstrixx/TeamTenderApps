import { BaseRepository } from '../common/repositories/BaseRepository';
import prisma from '../database/prisma';
import { DocumentVersion } from '@prisma/client';

class DocumentVersionRepository extends BaseRepository<DocumentVersion> {
  constructor() {
    super(prisma.documentVersion);
  }

  async findByDocumentId(documentId: string): Promise<DocumentVersion[]> {
    return this.model.findMany({
      where: { documentId },
      orderBy: { versionNumber: 'desc' }
    });
  }
}

export default new DocumentVersionRepository();
