import { Prisma, WorkspaceRole } from '@prisma/client';
import prisma from '../database/prisma';
import { QueryOptions } from '../common/query/QueryOptions';
import { QueryResult } from '../common/query/QueryResult';
import { BaseRepository } from '../common/repositories/BaseRepository';

export type WorkspaceRoleFilters = {
};

export type WorkspaceRoleQuery = QueryOptions<WorkspaceRoleFilters>;

export class WorkspaceRoleRepositoryImpl extends BaseRepository<WorkspaceRole, WorkspaceRoleQuery> {
  constructor() {
    super(prisma.workspaceRole);
  }

  async findAll(query: WorkspaceRoleQuery): Promise<QueryResult<WorkspaceRole>> {
    const { keyword } = query;

    const where: Prisma.WorkspaceRoleWhereInput = {};

    if (keyword) {
      where.OR = [
        { name: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } }
      ];
    }

    return super.findAll(query, where, ['name', 'createdAt']);
  }
}

export const WorkspaceRoleRepository = new WorkspaceRoleRepositoryImpl();
export default WorkspaceRoleRepository;
