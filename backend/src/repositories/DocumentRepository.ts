import { BaseRepository } from '../common/repositories/BaseRepository';
import prisma from '../database/prisma';
import { Document, Prisma } from '@prisma/client';

class DocumentRepository extends BaseRepository<Document> {
  constructor() {
    super(prisma.document);
  }

  async findByWorkspaceId(workspaceId: string): Promise<Document[]> {
    return this.model.findMany({
      where: { workspaceId, deletedAt: null },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findBySha256(sha256: string): Promise<Document | null> {
    return this.model.findFirst({
      where: { sha256, deletedAt: null }
    });
  }
}

export default new DocumentRepository();
