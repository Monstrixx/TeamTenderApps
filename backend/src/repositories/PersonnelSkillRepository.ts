import { BaseRepository } from '../common/repositories/BaseRepository';
import prisma from '../database/prisma';
import { PersonnelSkill, Prisma } from '@prisma/client';

class PersonnelSkillRepository extends BaseRepository<PersonnelSkill> {
  constructor() {
    super(prisma.personnelSkill);
  }

  async findByPersonnelId(personnelId: string): Promise<PersonnelSkill[]> {
    return this.model.findMany({
      where: { personnelId },
      orderBy: { createdAt: 'desc' }
    });
  }
}

export default new PersonnelSkillRepository();
