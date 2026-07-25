import { describe, it, expect, vi, beforeEach } from 'vitest';
import SupplierService from '../src/services/SupplierService';
import SupplierRepository from '../src/repositories/SupplierRepository';
import { CompanyRepository } from '../src/repositories/CompanyRepository';
import WorkspaceRepository from '../src/repositories/WorkspaceRepository';
import { SupplierStatisticsService } from '../src/services/SupplierStatisticsService';
import { SlugService } from '../src/services/SlugService';
import { SupplierStatus, WorkspaceStatus, CompanyStatus, SupplierCategory, SupplierBusinessType } from '@prisma/client';

vi.mock('../src/repositories/SupplierRepository');
vi.mock('../src/repositories/WorkspaceRepository');
vi.mock('../src/repositories/CompanyRepository');
vi.mock('../src/services/SlugService');

// Mock RequestContext
vi.mock('../src/common/context/RequestContext', () => ({
  getRequestContext: vi.fn(() => ({
    workspaceId: 'ws-1',
    userId: 'user-1',
  }))
}));

describe('SupplierService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createSupplier', () => {
    it('should create a supplier with generated code and slug', async () => {
      const mockWorkspace = { id: 'ws-1', status: WorkspaceStatus.ACTIVE };
      const mockCompany = { id: 'comp-1', workspaceId: 'ws-1', status: CompanyStatus.ACTIVE };
      const createData: any = { companyId: 'comp-1', name: 'Test Supplier', businessType: SupplierBusinessType.PT, category: SupplierCategory.SERVICES, status: SupplierStatus.ACTIVE };

      vi.mocked(WorkspaceRepository.findById).mockResolvedValue(mockWorkspace as any);
      vi.mocked(CompanyRepository.findById).mockResolvedValue(mockCompany as any);
      vi.mocked(SupplierRepository.existsByName).mockResolvedValue(false);
      vi.mocked(SupplierRepository.countByWorkspace).mockResolvedValue(0);
      vi.mocked(SlugService.generate).mockReturnValue('test-supplier');
      vi.mocked(SlugService.ensureUnique).mockResolvedValue('test-supplier');
      vi.mocked(SupplierRepository.create).mockResolvedValue({ ...createData, id: 'sup-1', code: 'SUP-000001', slug: 'test-supplier', workspaceId: 'ws-1' } as any);

      const result = await SupplierService.createSupplier(createData);

      expect(result.code).toBe('SUP-000001');
      expect(result.slug).toBe('test-supplier');
      expect(SupplierRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        code: 'SUP-000001',
        slug: 'test-supplier'
      }));
    });

    it('should throw error if workspace is missing or inactive', async () => {
      vi.mocked(WorkspaceRepository.findById).mockResolvedValue({ id: 'ws-1', status: WorkspaceStatus.INACTIVE } as any);
      await expect(SupplierService.createSupplier({ companyId: 'comp-1', name: 'Test' } as any)).rejects.toThrow('Cannot create supplier in inactive workspace');
    });
  });

  describe('updateSupplier (optimistic locking)', () => {
    it('should update successfully with correct version', async () => {
      const mockSupplier = { id: 'sup-1', workspaceId: 'ws-1', version: 1 };
      vi.mocked(SupplierRepository.findById).mockResolvedValue(mockSupplier as any);
      vi.mocked(SupplierRepository.updateWithVersion).mockResolvedValue({ ...mockSupplier, version: 2 } as any);

      const result = await SupplierService.updateSupplier('sup-1', { name: 'Updated', version: 1 });
      expect(result.version).toBe(2);
      expect(SupplierRepository.updateWithVersion).toHaveBeenCalledWith('sup-1', 1, expect.any(Object), 'user-1');
    });

    it('should throw VERSION_CONFLICT if version mismatches', async () => {
      const mockSupplier = { id: 'sup-1', workspaceId: 'ws-1', version: 1 };
      vi.mocked(SupplierRepository.findById).mockResolvedValue(mockSupplier as any);
      vi.mocked(SupplierRepository.updateWithVersion).mockRejectedValue(new Error('VERSION_CONFLICT'));

      await expect(SupplierService.updateSupplier('sup-1', { name: 'Updated', version: 1 }))
        .rejects.toThrow('Supplier has been modified by another user');
    });
  });
});

describe('SupplierStatisticsService', () => {
  it('should calculate profile completeness correctly', () => {
    const profile = {
      contacts: [{ id: 1 }],
      bankAccounts: [{ id: 1 }],
      email: 'test@example.com',
      phone: '123456',
      website: 'https://example.com',
      logoUrl: 'https://example.com/logo.png',
      tax: { npwp: '123', pkpNumber: '456' }
    };
    
    const result = SupplierStatisticsService.calculate(profile);
    
    // 15 + 15 + 10 + 10 + 5 + 5 + 20 + 20 = 100
    expect(result.profileCompleteness).toBe(100);
    expect(result.contactCount).toBe(1);
    expect(result.bankAccountCount).toBe(1);
  });
});
