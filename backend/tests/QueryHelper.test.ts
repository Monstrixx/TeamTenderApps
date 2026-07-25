import { describe, it, expect } from 'vitest';
import { QueryHelper } from '../src/common/query/QueryHelper';

describe('QueryHelper', () => {
  describe('getPagination', () => {
    it('should return default skip and take if no options provided', () => {
      const { skip, take } = QueryHelper.getPagination({});
      expect(skip).toBe(0);
      expect(take).toBe(20);
    });

    it('should correctly calculate skip and take', () => {
      const { skip, take } = QueryHelper.getPagination({ page: 3, limit: 15 });
      expect(skip).toBe(30);
      expect(take).toBe(15);
    });

    it('should prevent negative or zero pages', () => {
      const { skip, take } = QueryHelper.getPagination({ page: -1, limit: 10 });
      expect(skip).toBe(0); // page 1 is the minimum
      expect(take).toBe(10);
    });
  });

  describe('getSortParams', () => {
    it('should return default sort and order if none provided', () => {
      const sortParams = QueryHelper.getSortParams({}, ['createdAt']);
      expect(sortParams).toEqual({ createdAt: 'desc' });
    });

    it('should correctly format sort and order', () => {
      const sortParams = QueryHelper.getSortParams({ sort: 'name', order: 'asc' }, ['createdAt', 'name']);
      expect(sortParams).toEqual({ name: 'asc' });
    });

    it('should throw an error if sort field is not in whitelist', () => {
      expect(() => {
        QueryHelper.getSortParams({ sort: 'password' }, ['createdAt', 'name']);
      }).toThrow('Invalid sort field: password. Allowed fields: createdAt, name');
    });
  });

  describe('formatResult', () => {
    it('should correctly format standard query result', () => {
      const data = [{ id: 1 }, { id: 2 }];
      const total = 50;
      const result = QueryHelper.formatResult(data, total, { page: 2, limit: 2 });
      
      expect(result).toEqual({
        data,
        total: 50,
        page: 2,
        pageSize: 2,
        totalPages: 25,
        hasNext: true,
        hasPrevious: true,
      });
    });

    it('should handle edge cases like total pages properly', () => {
      const data = [{ id: 1 }];
      const total = 1;
      const result = QueryHelper.formatResult(data, total, { page: 1, limit: 20 });
      
      expect(result.totalPages).toBe(1);
      expect(result.hasNext).toBe(false);
      expect(result.hasPrevious).toBe(false);
    });
  });
});
