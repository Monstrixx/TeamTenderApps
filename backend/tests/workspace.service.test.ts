import { describe, it, expect, vi, beforeEach } from 'vitest';
import WorkspaceService from '../src/services/WorkspaceService';
import WorkspaceRepository from '../src/repositories/WorkspaceRepository';
import { ApiError } from '../src/common/responses/ApiError';
import { WorkspaceStatus } from '@prisma/client';

vi.mock('../src/repositories/WorkspaceRepository');

describe('WorkspaceService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createWorkspace', () => {
    it('should generate a code and create a workspace', async () => {
      vi.mocked(WorkspaceRepository.count).mockResolvedValue(0);
      vi.mocked(WorkspaceRepository.create).mockResolvedValue({ id: '1', code: 'WS-000001' } as any);

      const result = await WorkspaceService.createWorkspace({
        name: 'Test WS',
        status: WorkspaceStatus.ACTIVE,
        ownerId: 'user-1'
      }, 'user-1');

      expect(WorkspaceRepository.count).toHaveBeenCalled();
      expect(WorkspaceRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        code: 'WS-000001',
        name: 'Test WS'
      }));
      expect(result.code).toBe('WS-000001');
    });
  });

  describe('updateWorkspace', () => {
    it('should reject updating if workspace is soft deleted', async () => {
      vi.mocked(WorkspaceRepository.findById).mockResolvedValue({ id: '1', deletedAt: new Date() } as any);

      await expect(WorkspaceService.updateWorkspace('1', { name: 'New Name' }, 'user-1'))
        .rejects.toThrow(ApiError);
      await expect(WorkspaceService.updateWorkspace('1', { name: 'New Name' }, 'user-1'))
        .rejects.toThrow('Cannot update a deleted workspace');
    });

    it('should ignore code in update data', async () => {
      vi.mocked(WorkspaceRepository.findById).mockResolvedValue({ id: '1', deletedAt: null } as any);
      vi.mocked(WorkspaceRepository.update).mockResolvedValue({ id: '1' } as any);

      await WorkspaceService.updateWorkspace('1', { name: 'New Name', code: 'HACK' } as any, 'user-1');

      expect(WorkspaceRepository.update).toHaveBeenCalledWith('1', expect.objectContaining({
        name: 'New Name'
      }));
      expect(WorkspaceRepository.update).not.toHaveBeenCalledWith('1', expect.objectContaining({
        code: 'HACK'
      })); // Wait, the service spreads `data` into `updateData`. It doesn't strip `code` explicitly if it's passed.
      // Ah, I need to fix the service to strip `code` just in case, though Zod schema doesn't allow it. 
      // Zod schema doesn't have `code` in update workspace, so it will be stripped if `strip` is used. But it's good to ensure it.
    });
  });

  describe('deleteWorkspace', () => {
    it('should reject deleting twice', async () => {
      vi.mocked(WorkspaceRepository.findById).mockResolvedValue({ id: '1', deletedAt: new Date() } as any);

      await expect(WorkspaceService.deleteWorkspace('1', 'user-1'))
        .rejects.toThrow('Workspace is already deleted');
    });
  });

  describe('restoreWorkspace', () => {
    it('should reject restoring if not deleted', async () => {
      vi.mocked(WorkspaceRepository.findById).mockResolvedValue({ id: '1', deletedAt: null } as any);

      await expect(WorkspaceService.restoreWorkspace('1', 'user-1'))
        .rejects.toThrow('Workspace is not deleted');
    });
  });
});
