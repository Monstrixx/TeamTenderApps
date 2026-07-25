import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { auditLog } from '../utils/auditLogger';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const context = {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      };

      const { accessToken, refreshToken, user } = await AuthService.login(username, password, context);

      auditLog({
        event: 'LOGIN_SUCCESS',
        requestId: req.headers['x-request-id'] as string,
        userId: user.id,
        ip: context.ipAddress,
        userAgent: context.userAgent,
        timestamp: new Date().toISOString(),
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/api/v1/auth',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        data: { accessToken },
        meta: {
          requestId: req.headers['x-request-id'],
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      auditLog({
        event: 'LOGIN_FAILED',
        requestId: req.headers['x-request-id'] as string,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString(),
        details: { username: req.body?.username },
      });
      next(error);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      const context = {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      };

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          errors: [{ message: 'Missing refresh token' }],
          meta: {
            requestId: req.headers['x-request-id'],
            timestamp: new Date().toISOString(),
          },
        });
      }

      const { accessToken, refreshToken: newRefreshToken, user } = await AuthService.refresh(
        refreshToken,
        context
      );

      auditLog({
        event: 'TOKEN_REFRESH',
        requestId: req.headers['x-request-id'] as string,
        userId: user.id,
        ip: context.ipAddress,
        userAgent: context.userAgent,
        timestamp: new Date().toISOString(),
      });

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/api/v1/auth',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        data: { accessToken },
        meta: {
          requestId: req.headers['x-request-id'],
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (refreshToken) {
        await AuthService.logout(refreshToken);
      }

      auditLog({
        event: 'LOGOUT',
        requestId: req.headers['x-request-id'] as string,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString(),
      });

      res.clearCookie('refreshToken', { path: '/api/v1/auth' });

      return res.status(200).json({
        success: true,
        data: {},
        meta: {
          requestId: req.headers['x-request-id'],
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const authReq = req as unknown as { user?: { id: string } };
      const userId = authReq.user?.id;
      if (!userId) {
        return res.status(401).json({
          success: false,
          errors: [{ message: 'Unauthorized' }],
          meta: {
            requestId: req.headers['x-request-id'],
            timestamp: new Date().toISOString(),
          },
        });
      }

      const user = await AuthService.me(userId);

      return res.status(200).json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.roles.map((r) => r.role.name),
        },
        meta: {
          requestId: req.headers['x-request-id'],
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
