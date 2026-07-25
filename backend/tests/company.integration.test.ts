import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { CompanyRepository } from '../src/repositories/CompanyRepository';
import WorkspaceRepository from '../src/repositories/WorkspaceRepository';
import { UserRepository } from '../src/repositories/UserRepository';
import * as jwtUtils from '../src/utils/jwt';
import { CompanyStatus, WorkspaceStatus } from '@prisma/client';

vi.mock('../src/repositories/CompanyRepository');
vi.mock('../src/repositories/WorkspaceRepository');
vi.mock('../src/repositories/UserRepository');

const generateValidToken = (workspaceId = 'ws-1', permissions: string[] = ['*']) => {
  return jwtUtils.generateAccessToken({
    sub: 'user-1',
    role: ['SUPER_ADMIN'],
    permissions: permissions,
    tokenVersion: 1,
    workspaceId
  });
};

describe('Company Endpoints Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(UserRepository.findById).mockResolvedValue({
      id: 'user-1',
      tokenVersion: 1
    } as any);
  });

  describe('GET /api/v1/companies', () => {
    it('should paginate and filter by workspace automatically', async () => {
      const mockToken = generateValidToken('ws-1');
      vi.mocked(CompanyRepository.findAll).mockResolvedValue({
        total: 10,
        data: [{ id: 'comp-1', name: 'PT ABC' }] as any,
        page: 1,
        pageSize: 20,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false
      });

      const res = await request(app)
        .get('/api/v1/companies')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(200);
      // Auto-filters by workspaceId due to RequestContext
      expect(CompanyRepository.findAll).toHaveBeenCalledWith(expect.objectContaining({
        filters: { workspaceId: 'ws-1' }
      }));
      expect(res.body.data.length).toBe(1);
    });
  });

  describe('POST /api/v1/companies', () => {
    it('should create a new company with valid payload', async () => {
      const mockToken = generateValidToken('ws-1');
      vi.mocked(CompanyRepository.count).mockResolvedValue(0);
      vi.mocked(WorkspaceRepository.findById).mockResolvedValue({ status: WorkspaceStatus.ACTIVE } as any);
      vi.mocked(CompanyRepository.findAll).mockResolvedValue({ data: [] } as any);
      vi.mocked(CompanyRepository.create).mockResolvedValue({ id: 'comp-1', code: 'CMP-000001', name: 'PT ABC' } as any);

      const res = await request(app)
        .post('/api/v1/companies')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({
          name: 'PT ABC',
          businessType: 'PT',
          status: 'ACTIVE'
        });

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe('PT ABC');
    });
  });

  describe('GET /api/v1/companies/:id/profile', () => {
    it('should return aggregated profile including statistics', async () => {
      const mockToken = generateValidToken('ws-1');
      vi.mocked(CompanyRepository.getProfile).mockResolvedValue({
        id: 'comp-1',
        name: 'PT ABC',
        workspaceId: 'ws-1',
        legal: { nib: '1234567890123' },
        addresses: [{ id: 'addr-1' }],
        workspace: { id: 'ws-1' }
      });

      const res = await request(app)
        .get('/api/v1/companies/comp-1/profile')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.company.name).toBe('PT ABC');
      expect(res.body.data.legal.nib).toBe('1234567890123');
      expect(res.body.data.statistics).toBeDefined();
    });

    it('should reject access if company belongs to different workspace', async () => {
      const mockToken = generateValidToken('ws-2'); // User is in ws-2
      // Mock returns undefined simulating not found for that workspaceId
      vi.mocked(CompanyRepository.getProfile).mockResolvedValue(null);

      const res = await request(app)
        .get('/api/v1/companies/comp-1/profile')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/v1/companies/:id', () => {
    it('should update company when version matches', async () => {
      const mockToken = generateValidToken('ws-1');
      vi.mocked(CompanyRepository.findById).mockResolvedValue({ id: 'comp-1', workspaceId: 'ws-1' } as any);
      vi.mocked(CompanyRepository.updateWithVersion).mockResolvedValue({ id: 'comp-1', version: 4, name: 'New Name' } as any);

      const res = await request(app)
        .put('/api/v1/companies/comp-1')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({
          name: 'New Name',
          version: 3
        });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('New Name');
      expect(CompanyRepository.updateWithVersion).toHaveBeenCalledWith('comp-1', 3, expect.objectContaining({ name: 'New Name' }));
    });

    it('should return 409 conflict when version does not match', async () => {
      const mockToken = generateValidToken('ws-1');
      vi.mocked(CompanyRepository.findById).mockResolvedValue({ id: 'comp-1', workspaceId: 'ws-1' } as any);
      vi.mocked(CompanyRepository.updateWithVersion).mockRejectedValue(new Error('VERSION_CONFLICT'));

      const res = await request(app)
        .put('/api/v1/companies/comp-1')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({
          name: 'New Name',
          version: 3
        });

      expect(res.status).toBe(409);
      expect(res.body.error.code).toBe('VERSION_CONFLICT');
    });

    it('should require version field', async () => {
      const mockToken = generateValidToken('ws-1');
      vi.mocked(CompanyRepository.findById).mockResolvedValue({ id: 'comp-1', workspaceId: 'ws-1' } as any);

      const res = await request(app)
        .put('/api/v1/companies/comp-1')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({
          name: 'New Name',
        });

      expect(res.status).toBe(400);
    });
  });
});
