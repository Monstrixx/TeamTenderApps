import { Request, Response, NextFunction } from 'express';
import SupplierService from '../services/SupplierService';

interface AuthRequest extends Request {
  user?: { id: string };
}

export class SupplierController {
  
  async listSuppliers(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, companyId, ...baseQuery } = req.query as any;
      const result = await SupplierService.getSuppliers({
        ...baseQuery,
        filters: { status, companyId }
      });
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

  async getSupplier(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const supplier = await SupplierService.getSupplierById(id);
      
      return res.status(200).json({
        success: true,
        data: supplier,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getSupplierProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const profile = await SupplierService.getSupplierProfile(id);
      
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

  async createSupplier(req: Request, res: Response, next: NextFunction) {
    try {
      const supplier = await SupplierService.createSupplier(req.body);
      
      return res.status(201).json({
        success: true,
        data: supplier,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSupplier(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const supplier = await SupplierService.updateSupplier(id, req.body);
      
      return res.status(200).json({
        success: true,
        data: supplier,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteSupplier(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const supplier = await SupplierService.deleteSupplier(id);
      
      return res.status(200).json({
        success: true,
        data: supplier,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async restoreSupplier(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const supplier = await SupplierService.restoreSupplier(id);
      
      return res.status(200).json({
        success: true,
        data: supplier,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async setPrimaryContact(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { contactId } = req.body;
      await SupplierService.setPrimaryContact(id, contactId);
      
      return res.status(200).json({
        success: true,
        message: 'Primary contact updated successfully',
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async setPrimaryBankAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { bankAccountId } = req.body;
      await SupplierService.setPrimaryBankAccount(id, bankAccountId);
      
      return res.status(200).json({
        success: true,
        message: 'Primary bank account updated successfully',
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

export default new SupplierController();
