import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const workspaceMemberRoleSchema = z.object({
  body: z.object({
    roleId: z.string().cuid('Invalid role ID format'),
  })
});

export const workspaceMemberStatusSchema = z.object({
  body: z.object({
    status: z.enum(['ACTIVE', 'INACTIVE']),
  })
});

export const workspaceInvitationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    displayName: z.string().optional(),
    roleId: z.string().cuid('Invalid role ID format'),
  })
});

export const workspaceInvitationAcceptSchema = z.object({
  params: z.object({
    token: z.string(),
  }),
});
