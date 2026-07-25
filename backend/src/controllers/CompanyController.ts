import { Request, Response, NextFunction } from 'express';
import CompanyService from '../services/CompanyService';
import { CreateCompanySchema, UpdateCompanySchema, CompanyQuerySchema } from '../schemas/company.schema';

export class CompanyController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = CreateCompanySchema.parse(req.body) as any;
      const company = await CompanyService.createCompany(data);
      return res.status(201).json({
        success: true,
        data: company,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query = CompanyQuerySchema.parse(req.query);
      const result = await CompanyService.getCompanies(query);
      return res.status(200).json({
        success: true,
        data: result.data,
        meta: {
          page: result.page,
          pageSize: result.pageSize,
          total: result.total,
          totalPages: result.totalPages,
          hasNext: result.hasNext,
          hasPrevious: result.hasPrevious,
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const company = await CompanyService.getCompanyById(id);
      return res.status(200).json({
        success: true,
        data: company,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const profile = await CompanyService.getCompanyProfile(id);
      return res.status(200).json({
        success: true,
        data: profile,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const data = UpdateCompanySchema.parse(req.body);
      const updatedCompany = await CompanyService.updateCompany(id, data);
      return res.status(200).json({
        success: true,
        data: updatedCompany,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const deletedCompany = await CompanyService.deleteCompany(id);
      return res.status(200).json({
        success: true,
        data: deletedCompany,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async restore(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const restoredCompany = await CompanyService.restoreCompany(id);
      return res.status(200).json({
        success: true,
        data: restoredCompany,
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
