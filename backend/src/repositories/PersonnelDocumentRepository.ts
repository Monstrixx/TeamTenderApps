import { BaseRepository } from '../common/repositories/BaseRepository';
import prisma from '../database/prisma';
import { PersonnelDocument, Prisma } from '@prisma/client';

class PersonnelDocumentRepository extends BaseRepository<PersonnelDocument> {
  constructor() {
    super(prisma.personnelDocument);
  }

  async create(data: Prisma.PersonnelDocumentUncheckedCreateInput): Promise<PersonnelDocument> {
    return prisma.personnelDocument.create({ data });
  }

  async deleteDocument(id: string): Promise<PersonnelDocument> {
    return prisma.personnelDocument.delete({ where: { id } });
  }
}

export default new PersonnelDocumentRepository();
