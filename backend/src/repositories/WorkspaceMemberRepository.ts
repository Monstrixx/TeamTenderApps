import { Prisma, WorkspaceMember, MemberStatus } from '@prisma/client';
import prisma from '../database/prisma';
import { QueryOptions } from '../common/query/QueryOptions';
import { QueryResult } from '../common/query/QueryResult';
import { BaseRepository } from '../common/repositories/BaseRepository';

export type WorkspaceMemberFilters = {
  workspaceId?: string;
  status?: string;
};

export type WorkspaceMemberQuery = QueryOptions<WorkspaceMemberFilters>;

export class WorkspaceMemberRepositoryImpl extends BaseRepository<WorkspaceMember, WorkspaceMemberQuery> {
  constructor() {
    super(prisma.workspaceMember);
  }

  async findAll(query: WorkspaceMemberQuery): Promise<QueryResult<WorkspaceMember>> {
    const { keyword, includeDeleted = false, filters } = query;

    const where: Prisma.WorkspaceMemberWhereInput = {};

    if (!includeDeleted) {
      where.deletedAt = null;
    }

    if (filters?.workspaceId) {
      where.workspaceId = filters.workspaceId;
    }

    if (filters?.status) {
      where.status = filters.status as MemberStatus;
    }

    if (keyword) {
      where.user = {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { email: { contains: keyword, mode: 'insensitive' } },
        ],
      };
    }

    // Since we need to include user and role, we override the default findAll implementation
    // because BaseRepository might not support deep includes out of the box.
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.workspaceMember.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: { id: true, name: true, email: true, username: true }
          },
          role: true
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.workspaceMember.count({ where })
    ]);

    return {
      data: data as unknown as WorkspaceMember[],
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrevious: page > 1
    };
  }

  async findByWorkspaceAndUser(workspaceId: string, userId: string, includeDeleted = false): Promise<WorkspaceMember | null> {
    const where: Prisma.WorkspaceMemberWhereInput = { workspaceId, userId };
    if (!includeDeleted) {
      where.deletedAt = null;
    }
    return prisma.workspaceMember.findFirst({
        where,
        include: {
            role: true,
            user: {
                select: { id: true, name: true, email: true }
            }
        }
    });
  }

  async create(data: Prisma.WorkspaceMemberCreateInput): Promise<WorkspaceMember> {
    return prisma.workspaceMember.create({ data });
  }

  async update(id: string, data: Prisma.WorkspaceMemberUpdateInput): Promise<WorkspaceMember> {
    return prisma.workspaceMember.update({
      where: { id },
      data,
      include: {
        role: true,
        user: { select: { id: true, name: true, email: true } }
      }
    });
  }
}

export const WorkspaceMemberRepository = new WorkspaceMemberRepositoryImpl();
export default WorkspaceMemberRepository;
