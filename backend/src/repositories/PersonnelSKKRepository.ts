import { BaseRepository } from '../common/repositories/BaseRepository';
import prisma from '../database/prisma';
import { PersonnelSKK, Prisma } from '@prisma/client';

class PersonnelSKKRepository extends BaseRepository<PersonnelSKK> {
  constructor() {
    super(prisma.personnelSKK);
  }

  async create(data: Prisma.PersonnelSKKUncheckedCreateInput): Promise<PersonnelSKK> {
    return prisma.personnelSKK.create({ data });
  }

  async update(id: string, data: Prisma.PersonnelSKKUpdateInput): Promise<PersonnelSKK> {
    return prisma.personnelSKK.update({
      where: { id },
      data
    });
  }
}

export default new PersonnelSKKRepository();
