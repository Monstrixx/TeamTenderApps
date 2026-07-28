import { Prisma, WorkspaceInvitation, InvitationStatus } from '@prisma/client';
import prisma from '../database/prisma';
import { QueryOptions } from '../common/query/QueryOptions';
import { QueryResult } from '../common/query/QueryResult';
import { BaseRepository } from '../common/repositories/BaseRepository';

export type WorkspaceInvitationFilters = {
  workspaceId?: string;
  status?: string;
};

export type WorkspaceInvitationQuery = QueryOptions<WorkspaceInvitationFilters>;

export class WorkspaceInvitationRepositoryImpl extends BaseRepository<WorkspaceInvitation, WorkspaceInvitationQuery> {
  constructor() {
    super(prisma.workspaceInvitation);
  }

  async findAll(query: WorkspaceInvitationQuery): Promise<QueryResult<WorkspaceInvitation>> {
    const { keyword, filters } = query;

    const where: Prisma.WorkspaceInvitationWhereInput = {};

    if (filters?.workspaceId) {
      where.workspaceId = filters.workspaceId;
    }

    if (filters?.status) {
      where.status = filters.status as InvitationStatus;
    }

    if (keyword) {
      where.OR = [
        { email: { contains: keyword, mode: 'insensitive' } },
        { displayName: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.workspaceInvitation.findMany({
        where,
        skip,
        take: limit,
        include: {
          role: true,
          inviter: { select: { id: true, name: true, email: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.workspaceInvitation.count({ where })
    ]);

    return {
      data: data as unknown as WorkspaceInvitation[],
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrevious: page > 1
    };
  }

  async findByToken(token: string): Promise<WorkspaceInvitation | null> {
    return prisma.workspaceInvitation.findUnique({
      where: { token },
      include: {
        role: true,
        workspace: true
      }
    });
  }

  async create(data: Prisma.WorkspaceInvitationCreateInput): Promise<WorkspaceInvitation> {
    return prisma.workspaceInvitation.create({ data });
  }

  async update(id: string, data: Prisma.WorkspaceInvitationUpdateInput): Promise<WorkspaceInvitation> {
    return prisma.workspaceInvitation.update({
      where: { id },
      data,
    });
  }
}

export const WorkspaceInvitationRepository = new WorkspaceInvitationRepositoryImpl();
export default WorkspaceInvitationRepository;
