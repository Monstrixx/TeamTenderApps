import { Prisma, Workspace, WorkspaceStatus } from '@prisma/client';
import prisma from '../database/prisma';
import { QueryOptions } from '../common/query/QueryOptions';
import { QueryResult } from '../common/query/QueryResult';
import { BaseRepository } from '../common/repositories/BaseRepository';

export type WorkspaceFilters = {
  status?: string;
  ownerId?: string;
};

export type WorkspaceQuery = QueryOptions<WorkspaceFilters>;

export class WorkspaceRepositoryImpl extends BaseRepository<Workspace, WorkspaceQuery> {
  constructor() {
    super(prisma.workspace);
  }

  async findAll(query: WorkspaceQuery): Promise<QueryResult<Workspace>> {
    const { keyword, includeDeleted = false, filters } = query;

    const where: Prisma.WorkspaceWhereInput = {};

    if (!includeDeleted) {
      where.deletedAt = null;
    }

    if (filters?.status) {
      where.status = filters.status as WorkspaceStatus;
    }

    if (filters?.ownerId) {
      where.ownerId = filters.ownerId;
    }

    if (keyword) {
      where.OR = [
        { code: { contains: keyword, mode: 'insensitive' } },
        { name: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    return super.findAll(query, where, ['name', 'createdAt', 'updatedAt', 'status']);
  }

  async findByCode(code: string, includeDeleted = false): Promise<Workspace | null> {
    const where: Prisma.WorkspaceWhereInput = { code };
    if (!includeDeleted) {
      where.deletedAt = null;
    }
    return prisma.workspace.findFirst({ where });
  }

  async create(data: Prisma.WorkspaceCreateInput): Promise<Workspace> {
    return prisma.workspace.create({ data });
  }

  async update(id: string, data: Prisma.WorkspaceUpdateInput): Promise<Workspace> {
    return prisma.workspace.update({
      where: { id },
      data,
    });
  }
}

export const WorkspaceRepository = new WorkspaceRepositoryImpl();
export default WorkspaceRepository;
