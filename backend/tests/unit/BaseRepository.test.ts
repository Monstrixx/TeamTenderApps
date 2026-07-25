import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BaseRepository } from '../../src/common/repositories/BaseRepository';

// Create a dummy repository extending BaseRepository
class DummyRepository extends BaseRepository<any> {
  constructor(model: any) {
    super(model);
  }
}

describe('BaseRepository', () => {
  let mockModel: any;
  let repo: DummyRepository;

  beforeEach(() => {
    mockModel = {
      count: vi.fn(),
      findMany: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
    };
    repo = new DummyRepository(mockModel);
  });

  it('should calculate pagination correctly and format result', async () => {
    mockModel.count.mockResolvedValue(25);
    mockModel.findMany.mockResolvedValue([{ id: 1 }, { id: 2 }]);

    const result = await repo.findAll({ page: 2, limit: 10 });

    expect(mockModel.count).toHaveBeenCalledWith({ where: { deletedAt: null } });
    expect(mockModel.findMany).toHaveBeenCalledWith(expect.objectContaining({
      skip: 10,
      take: 10,
    }));

    expect(result.data.length).toBe(2);
    expect(result.page).toBe(2);
    expect(result.pageSize).toBe(10);
    expect(result.total).toBe(25);
    expect(result.totalPages).toBe(3);
  });

  it('should support soft delete', async () => {
    mockModel.update.mockResolvedValue({ id: 'dummy', deletedAt: new Date(), deletedBy: 'user-1' });

    await repo.softDelete('dummy', 'user-1');

    expect(mockModel.update).toHaveBeenCalledWith({
      where: { id: 'dummy' },
      data: expect.objectContaining({
        deletedBy: 'user-1'
      })
    });
  });

  it('should support restore', async () => {
    mockModel.update.mockResolvedValue({ id: 'dummy', deletedAt: null, deletedBy: null, updatedBy: 'user-2' });

    await repo.restore('dummy', 'user-2');

    expect(mockModel.update).toHaveBeenCalledWith({
      where: { id: 'dummy' },
      data: {
        deletedAt: null,
        deletedBy: null,
        updatedBy: 'user-2'
      }
    });
  });
});
