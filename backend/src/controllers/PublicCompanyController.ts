import { Request, Response, NextFunction } from 'express';
import PublicCompanyService from '../services/PublicCompanyService';

export class PublicCompanyController {
  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug as string;
      const result = await PublicCompanyService.getCompanyBySlug(slug);
      
      return res.status(200).json({
        success: true,
        data: result.company,
        seo: result.seo,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCompanyTrust(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug as string;
      const result = await PublicCompanyService.getCompanyTrust(slug);
      
      return res.status(200).json({
        success: true,
        data: result,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
