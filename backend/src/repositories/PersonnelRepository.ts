import { BaseRepository } from '../common/repositories/BaseRepository';
import prisma from '../database/prisma';
import { Personnel, Prisma } from '@prisma/client';

class PersonnelRepository extends BaseRepository<Personnel> {
  constructor() {
    super(prisma.personnel);
  }

  async create(data: Prisma.PersonnelCreateInput): Promise<Personnel> {
    return prisma.personnel.create({ data });
  }

  async countByWorkspace(workspaceId: string): Promise<number> {
    return prisma.personnel.count({
      where: { workspaceId }
    });
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const count = await prisma.personnel.count({
      where: { slug }
    });
    return count > 0;
  }

  async existsByNik(workspaceId: string, nik: string): Promise<boolean> {
    const count = await prisma.personnel.count({
      where: { workspaceId, nik }
    });
    return count > 0;
  }

  async updateWithVersion(id: string, expectedVersion: number, data: any, updatedBy: string): Promise<Personnel> {
    const updateResult = await prisma.personnel.updateMany({
      where: {
        id,
        version: expectedVersion,
        deletedAt: null
      },
      data: {
        ...data,
        version: { increment: 1 },
        updatedBy
      }
    });

    if (updateResult.count === 0) {
      throw new Error('VERSION_CONFLICT');
    }

    return this.findById(id) as Promise<Personnel>;
  }

  async findProfile(id: string): Promise<any | null> {
    return prisma.personnel.findFirst({
      where: { id, deletedAt: null },
      include: {
        educations: true,
        experiences: true,
        skk: true,
        documents: true,
        tenderDocuments: true,
        assignments: true,
        embeddings: true
      }
    });
  }
}

export default new PersonnelRepository();
