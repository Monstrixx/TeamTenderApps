import { BaseRepository } from '../common/repositories/BaseRepository';
import prisma from '../database/prisma';
import { PersonnelSKKHistory, Prisma } from '@prisma/client';

export class PersonnelSKKHistoryRepository extends BaseRepository<PersonnelSKKHistory> {
  constructor() {
    super(prisma.personnelSKKHistory);
  }

  async findBySKKId(skkId: string): Promise<PersonnelSKKHistory[]> {
    return this.model.findMany({
      where: { skkId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
