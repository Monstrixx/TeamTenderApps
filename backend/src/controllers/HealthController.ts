import { Request, Response } from 'express';
import prisma from '../database/prisma';

export class HealthController {
  static async getMetrics(req: Request, res: Response) {
    const memoryUsage = process.memoryUsage();
    
    let dbConnected = false;
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbConnected = true;
    } catch (error) {
      dbConnected = false;
    }

    res.json({
      uptime: process.uptime(),
      memory: {
        rss: memoryUsage.rss,
        heapTotal: memoryUsage.heapTotal,
        heapUsed: memoryUsage.heapUsed,
        external: memoryUsage.external,
      },
      databaseConnectivity: dbConnected,
      version: process.env.npm_package_version || '1.0.0',
      timestamp: new Date().toISOString()
    });
  }
}
