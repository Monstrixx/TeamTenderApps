import { describe, it, expect, vi, beforeEach } from 'vitest';
import CompanyService from '../../src/services/CompanyService';
import { CompanyRepository } from '../../src/repositories/CompanyRepository';
import WorkspaceRepository from '../../src/repositories/WorkspaceRepository';
import { requestContextStore } from '../../src/common/context/RequestContext';
import { CompanyStatus, WorkspaceStatus } from '@prisma/client';

vi.mock('../../src/repositories/CompanyRepository');
vi.mock('../../src/repositories/WorkspaceRepository');

describe('CompanyService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const runWithContext = (workspaceId: string | null, fn: () => Promise<any>) => {
    return requestContextStore.run({
      requestId: 'req-1',
      correlationId: 'req-1',
      startedAt: new Date(),
      workspaceId: workspaceId || undefined,
      userId: 'user-1'
    }, fn);
  };

  it('should auto-generate code and create company', async () => {
    vi.mocked(CompanyRepository.count).mockResolvedValue(0);
    vi.mocked(WorkspaceRepository.findById).mockResolvedValue({ status: WorkspaceStatus.ACTIVE } as any);
    vi.mocked(CompanyRepository.findAll).mockResolvedValue({ data: [] } as any);
    vi.mocked(CompanyRepository.create).mockResolvedValue({ id: 'comp-1', code: 'CMP-000001', name: 'PT ABC' } as any);

    await runWithContext('ws-1', async () => {
      const result = await CompanyService.createCompany({
        name: 'PT ABC',
        businessType: 'PT',
        status: CompanyStatus.ACTIVE,
      });
      expect(result.code).toBe('CMP-000001');
      expect(CompanyRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        code: 'CMP-000001',
        workspace: { connect: { id: 'ws-1' } }
      }));
    });
  });

  it('should reject creation if workspace is inactive', async () => {
    vi.mocked(WorkspaceRepository.findById).mockResolvedValue({ status: WorkspaceStatus.INACTIVE } as any);

    await expect(runWithContext('ws-1', () => CompanyService.createCompany({
      name: 'PT ABC',
      businessType: 'PT',
      status: CompanyStatus.ACTIVE,
    }))).rejects.toThrow('Cannot create company in inactive workspace');
  });

  it('should reject creation if company name already exists in the same workspace', async () => {
    vi.mocked(WorkspaceRepository.findById).mockResolvedValue({ status: WorkspaceStatus.ACTIVE } as any);
    vi.mocked(CompanyRepository.findAll).mockResolvedValue({ data: [{ name: 'PT ABC' }] } as any);

    await expect(runWithContext('ws-1', () => CompanyService.createCompany({
      name: 'PT abc',
      businessType: 'PT',
      status: CompanyStatus.ACTIVE,
    }))).rejects.toThrow('Company name already exists in this workspace');
  });

  it('should allow duplicate names across different workspaces (handled by repo filter)', async () => {
    vi.mocked(CompanyRepository.count).mockResolvedValue(0);
    vi.mocked(WorkspaceRepository.findById).mockResolvedValue({ status: WorkspaceStatus.ACTIVE } as any);
    // findAll returns empty for this workspace, meaning duplicate is in another workspace which doesn't show up here
    vi.mocked(CompanyRepository.findAll).mockResolvedValue({ data: [] } as any);
    vi.mocked(CompanyRepository.create).mockResolvedValue({ id: 'comp-1' } as any);

    await runWithContext('ws-1', async () => {
      await expect(CompanyService.createCompany({
        name: 'PT ABC',
        businessType: 'PT',
        status: CompanyStatus.ACTIVE,
      })).resolves.toBeDefined();
    });
  });

  it('should reject operations without workspace context', async () => {
    await expect(runWithContext(null, () => CompanyService.createCompany({
      name: 'PT ABC',
      businessType: 'PT',
      status: CompanyStatus.ACTIVE,
    }))).rejects.toThrow('Workspace context is missing');
  });
});
