import { z } from 'zod';
import { WorkspaceStatus } from '@prisma/client';
import { PaginationQuerySchema } from '../common/pagination/pagination.schema';

export const createWorkspaceSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(100),
    description: z.string().max(1000).optional().nullable(),
    status: z.nativeEnum(WorkspaceStatus).default(WorkspaceStatus.ACTIVE),
    ownerId: z.string().min(1, 'ownerId is required'),
  }),
});

export const updateWorkspaceSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().min(3).max(100).optional(),
    description: z.string().max(1000).optional().nullable(),
    status: z.nativeEnum(WorkspaceStatus).optional(),
    ownerId: z.string().optional(),
  }),
});

export const workspaceIdParamSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const workspaceQuerySchema = z.object({
  query: PaginationQuerySchema.extend({
    status: z.nativeEnum(WorkspaceStatus).optional(),
    ownerId: z.string().optional(),
  }),
});
