import { describe, it, expect, vi } from 'vitest';
import { SlugService } from '../../src/services/SlugService';

describe('SlugService', () => {
  it('should generate a deterministic slug', () => {
    expect(SlugService.generate('PT Maju Bersama')).toBe('pt-maju-bersama');
    expect(SlugService.generate(' PT ABC 123 !@#  ')).toBe('pt-abc-123');
    expect(SlugService.generate('Company_Name-test')).toBe('company-name-test');
  });

  it('should ensure uniqueness when base slug is not taken', async () => {
    const mockCheckFn = vi.fn().mockResolvedValue(false);
    const slug = await SlugService.ensureUnique('pt-abc', mockCheckFn, 'CMP-000001');
    expect(slug).toBe('pt-abc');
  });

  it('should append fallback suffix if base slug is taken', async () => {
    const mockCheckFn = vi.fn().mockResolvedValue(true);
    const slug = await SlugService.ensureUnique('pt-abc', mockCheckFn, 'CMP-000002');
    expect(slug).toBe('pt-abc-cmp000002');
  });
});
