import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { ApiError } from '../common/responses/ApiError';
import { UserRepository } from '../repositories/UserRepository';
import { getRequestContext } from '../common/context/RequestContext';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    workspaceId?: string;
    role: string[];
    permissions: string[];
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(ApiError.unauthorized('Missing or invalid authorization header'));
  }

  const token = authHeader.substring(7);

  try {
    const payload = verifyAccessToken(token);

    // Check token version to ensure it hasn't been globally revoked
    const user = await UserRepository.findById(payload.sub);
    if (!user) {
      return next(ApiError.unauthorized('User not found'));
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return next(ApiError.unauthorized('Token revoked'));
    }

    req.user = {
      id: payload.sub,
      workspaceId: payload.workspaceId,
      role: payload.role,
      permissions: payload.permissions,
    };

    const ctx = getRequestContext();
    if (ctx) {
      ctx.userId = payload.sub;
      ctx.workspaceId = payload.workspaceId || '';
    }

    return next();
  } catch {
    return next(ApiError.unauthorized('Invalid or expired token'));
  }
};

export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(); // Proceed without user
  }

  const token = authHeader.substring(7);

  try {
    const payload = verifyAccessToken(token);

    const user = await UserRepository.findById(payload.sub);
    if (user && user.tokenVersion === payload.tokenVersion) {
      req.user = {
        id: payload.sub,
        workspaceId: payload.workspaceId,
        role: payload.role,
        permissions: payload.permissions,
      };

    const ctx = getRequestContext();
    if (ctx) {
      ctx.userId = payload.sub;
      ctx.workspaceId = payload.workspaceId || '';
    }
    }
    
    return next();
  } catch {
    // For optional auth, invalid tokens can either fail or proceed anonymously.
    // Proceeding anonymously is usually better for optional routes.
    return next();
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    const hasRole = req.user.role.some((r) => allowedRoles.includes(r));
    // Super admin bypass
    const isSuperAdmin = req.user.role.includes('SUPER_ADMIN');

    if (!hasRole && !isSuperAdmin) {
      return next(ApiError.forbidden('Insufficient role'));
    }

    return next();
  };
};

export const requirePermission = (allowedPermissions: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    // Super admin bypass via wildcard permission
    const hasWildcard = req.user.permissions.includes('*');
    const hasPermission = req.user.permissions.some((p) => allowedPermissions.includes(p));

    if (!hasPermission && !hasWildcard) {
      return next(ApiError.forbidden('Insufficient permissions'));
    }

    return next();
  };
};
