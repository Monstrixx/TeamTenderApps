import { z } from 'zod';

export const PaginationQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional().default(1 as any),
  limit: z.string().regex(/^\d+$/).transform(Number).optional().default(20 as any),
  sort: z.string().optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
  keyword: z.string().optional(),
  includeDeleted: z.union([
    z.boolean(),
    z.string().transform(v => v === 'true')
  ]).optional().default(false)
});
