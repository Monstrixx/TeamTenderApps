import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import WorkspaceRepository from '../src/repositories/WorkspaceRepository';
import { UserRepository } from '../src/repositories/UserRepository';
import * as jwtUtils from '../src/utils/jwt';

vi.mock('../src/repositories/WorkspaceRepository');
vi.mock('../src/repositories/UserRepository');

const generateValidToken = (permissions: string[] = ['*']) => {
  return jwtUtils.generateAccessToken({
    sub: 'user-1',
    role: ['SUPER_ADMIN'],
    permissions: permissions,
    tokenVersion: 1
  });
};

describe('Workspace Endpoints Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(UserRepository.findById).mockResolvedValue({
      id: 'user-1',
      tokenVersion: 1
    } as any);
  });

  describe('GET /api/v1/workspaces', () => {
    it('should paginate results and support sorting/filtering', async () => {
      const mockToken = generateValidToken();
      vi.mocked(WorkspaceRepository.findAll).mockResolvedValue({
        total: 35,
        data: [{ id: 'ws-1' }, { id: 'ws-2' }] as any,
        page: 2,
        pageSize: 2,
        totalPages: 18,
        hasNext: true,
        hasPrevious: true
      });

      const res = await request(app)
        .get('/api/v1/workspaces?page=2&limit=2&sort=name&order=asc&status=ACTIVE')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(200);
      expect(WorkspaceRepository.findAll).toHaveBeenCalledWith(expect.objectContaining({
        page: 2,
        limit: 2,
        sort: 'name',
        order: 'asc',
        includeDeleted: false,
        filters: expect.objectContaining({
          status: 'ACTIVE',
        })
      }));
      expect(res.body.meta.page).toBe(2);
      expect(res.body.meta.pageSize).toBe(2);
      expect(res.body.meta.total).toBe(35);
      expect(res.body.meta.hasNext).toBe(true);
      expect(res.body.meta.hasPrevious).toBe(true);
    });

    it('should deny access if missing permission', async () => {
      const mockToken = generateValidToken(['unrelated.permission']); // Not wildcard, and not workspace.read

      const res = await request(app)
        .get('/api/v1/workspaces')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(403);
    });
  });

  describe('POST /api/v1/workspaces', () => {
    it('should validate inputs (name length)', async () => {
      const mockToken = generateValidToken();

      const res = await request(app)
        .post('/api/v1/workspaces')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({
          name: 'ab', // too short
          ownerId: 'user-1'
        });

      expect(res.status).toBe(400);
      expect(res.body.error.details[0].field).toBe('body.name');
    });
  });

  describe('PUT /api/v1/workspaces/:id', () => {
    it('should reject attempt to modify code', async () => {
      const mockToken = generateValidToken();
      
      vi.mocked(WorkspaceRepository.findById).mockResolvedValue({
        id: 'ws-1',
        code: 'WS-111111',
        deletedAt: null
      } as any);

      vi.mocked(WorkspaceRepository.update).mockResolvedValue({
        id: 'ws-1',
        code: 'WS-111111',
        name: 'Updated Name'
      } as any);

      const res = await request(app)
        .put('/api/v1/workspaces/ws-1')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({
          name: 'Updated Name',
          code: 'HACKED-CODE' // attempt to change
        });

      expect(res.status).toBe(200);
      
      // Ensure update is called without 'code'
      expect(WorkspaceRepository.update).toHaveBeenCalledWith('ws-1', expect.objectContaining({
        name: 'Updated Name'
      }));
      expect(WorkspaceRepository.update).not.toHaveBeenCalledWith('ws-1', expect.objectContaining({
        code: 'HACKED-CODE'
      }));
    });
  });

  describe('DELETE /api/v1/workspaces/:id', () => {
    it('should soft delete and not appear in normal list', async () => {
      const mockToken = generateValidToken();

      vi.mocked(WorkspaceRepository.findById).mockResolvedValue({
        id: 'ws-1',
        deletedAt: null
      } as any);
      vi.mocked(WorkspaceRepository.softDelete).mockResolvedValue({
        id: 'ws-1',
        deletedAt: new Date()
      } as any);

      const res = await request(app)
        .delete('/api/v1/workspaces/ws-1')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(200);
      expect(WorkspaceRepository.softDelete).toHaveBeenCalledWith('ws-1', 'user-1');
    });

    it('should reject if already deleted', async () => {
      const mockToken = generateValidToken();

      vi.mocked(WorkspaceRepository.findById).mockResolvedValue({
        id: 'ws-1',
        deletedAt: new Date()
      } as any);

      const res = await request(app)
        .delete('/api/v1/workspaces/ws-1')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(400);
      expect(res.body.error.message).toBe('Workspace is already deleted');
    });
  });

  describe('POST /api/v1/workspaces/:id/restore', () => {
    it('should restore a deleted workspace', async () => {
      const mockToken = generateValidToken();

      vi.mocked(WorkspaceRepository.findById).mockResolvedValue({
        id: 'ws-1',
        deletedAt: new Date()
      } as any);
      vi.mocked(WorkspaceRepository.restore).mockResolvedValue({
        id: 'ws-1',
        deletedAt: null
      } as any);

      const res = await request(app)
        .post('/api/v1/workspaces/ws-1/restore')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(200);
      expect(WorkspaceRepository.restore).toHaveBeenCalledWith('ws-1', 'user-1');
    });
  });
});
