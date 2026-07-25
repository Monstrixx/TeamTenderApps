import { describe, it, expect, vi, beforeEach } from 'vitest';
import PersonnelService from '../src/services/PersonnelService';
import PersonnelRepository from '../src/repositories/PersonnelRepository';
import WorkspaceRepository from '../src/repositories/WorkspaceRepository';
import { CompanyRepository } from '../src/repositories/CompanyRepository';
import { getRequestContext } from '../src/common/context/RequestContext';

vi.mock('../src/repositories/PersonnelRepository');
vi.mock('../src/repositories/WorkspaceRepository');
vi.mock('../src/repositories/CompanyRepository');
vi.mock('../src/common/context/RequestContext');

describe('PersonnelService', () => {
  const mockContext = {
    userId: 'user-1',
    workspaceId: 'ws-1',
    roles: [],
    permissions: []
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (getRequestContext as any).mockReturnValue(mockContext);
  });

  describe('createPersonnel', () => {
    it('should create personnel and generate correct code and slug', async () => {
      (WorkspaceRepository.findById as any).mockResolvedValue({ status: 'ACTIVE' });
      (CompanyRepository.findById as any).mockResolvedValue({ workspaceId: 'ws-1', status: 'ACTIVE' });
      (PersonnelRepository.existsByNik as any).mockResolvedValue(false);
      (PersonnelRepository.countByWorkspace as any).mockResolvedValue(0); // For code PER-000001
      (PersonnelRepository.existsBySlug as any).mockResolvedValue(false);
      
      const mockCreated = { id: 'per-1', fullName: 'John Doe', code: 'PER-000001', slug: 'john-doe' };
      (PersonnelRepository.create as any).mockResolvedValue(mockCreated);

      const result = await PersonnelService.createPersonnel({
        fullName: 'John Doe',
        companyId: 'comp-1'
      });

      expect(PersonnelRepository.create).toHaveBeenCalled();
      const createArg = vi.mocked(PersonnelRepository.create).mock.calls[0][0];
      
      expect(createArg.code).toBe('PER-000001');
      expect(createArg.slug).toBe('john-doe');
      expect(createArg.normalizedName).toBe('johndoe');
      expect(createArg.searchKeywords).toContain('john doe');
      
      expect(result).toEqual(mockCreated);
    });
  });

  describe('updatePersonnel', () => {
    it('should throw VERSION_CONFLICT if optimistic lock fails', async () => {
      (PersonnelRepository.findById as any).mockResolvedValue({ 
        id: 'per-1', 
        workspaceId: 'ws-1',
        fullName: 'John Doe'
      });
      
      (PersonnelRepository.updateWithVersion as any).mockRejectedValue(new Error('VERSION_CONFLICT'));

      await expect(PersonnelService.updatePersonnel('per-1', {
        fullName: 'John Updated',
        version: 1
      })).rejects.toThrow('Personnel has been modified by another user.');
    });
  });
});
