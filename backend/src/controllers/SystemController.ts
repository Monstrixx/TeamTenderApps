import { Request, Response, NextFunction } from 'express';
import prisma from '../database/prisma';

export class SystemController {
  static async health(req: Request, res: Response, _next: NextFunction) {
    try {
      // Test Database Connection
      await prisma.$queryRaw`SELECT 1`;
      
      res.status(200).json({
        success: true,
        data: { status: 'healthy', database: 'connected' },
        meta: {
          requestId: req.headers['X-Request-ID'] as string,
          timestamp: new Date().toISOString(),
        }
      });
    } catch {
      res.status(503).json({
        success: false,
        error: { code: '503', message: 'Database connection failed' },
        meta: {
          requestId: req.headers['X-Request-ID'] as string,
          timestamp: new Date().toISOString(),
        }
      });
    }
  }

  static version(req: Request, res: Response, _next: NextFunction) {
    res.status(200).json({
      success: true,
      data: { version: '1.0.0' },
      meta: {
        requestId: req.headers['X-Request-ID'] as string,
        timestamp: new Date().toISOString(),
      }
    });
  }
}
