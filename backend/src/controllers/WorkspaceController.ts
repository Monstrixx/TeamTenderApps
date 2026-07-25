import { Request, Response, NextFunction } from 'express';
import WorkspaceService from '../services/WorkspaceService';

interface AuthRequest extends Request {
  user?: { id: string };
}

export class WorkspaceController {
  
  async listWorkspaces(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, ownerId, ...baseQuery } = req.query as any;
      const result = await WorkspaceService.getWorkspaces({
        ...baseQuery,
        filters: { status, ownerId }
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

  async getWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const workspace = await WorkspaceService.getWorkspaceById(id);
      
      return res.status(200).json({
        success: true,
        data: workspace,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async createWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      // Assumes req.user is populated by authenticate middleware
      const userId = (req as AuthRequest).user?.id || 'system';
      const workspace = await WorkspaceService.createWorkspace(req.body, userId);
      
      return res.status(201).json({
        success: true,
        data: workspace,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const userId = (req as AuthRequest).user?.id || 'system';
      const workspace = await WorkspaceService.updateWorkspace(id, req.body, userId);
      
      return res.status(200).json({
        success: true,
        data: workspace,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const userId = (req as AuthRequest).user?.id || 'system';
      const workspace = await WorkspaceService.deleteWorkspace(id, userId);
      
      return res.status(200).json({
        success: true,
        data: workspace,
        meta: {
          requestId: req.headers['x-request-id'] || '',
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async restoreWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const userId = (req as AuthRequest).user?.id || 'system';
      const workspace = await WorkspaceService.restoreWorkspace(id, userId);
      
      return res.status(200).json({
        success: true,
        data: workspace,
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

export default new WorkspaceController();
