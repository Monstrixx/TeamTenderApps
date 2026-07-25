import { describe, it, expect } from 'vitest';
import { CompanyStatisticsService } from '../../src/services/CompanyStatisticsService';
import { AddressType } from '@prisma/client';

describe('CompanyStatisticsService', () => {
  it('should calculate profile completeness incrementally', () => {
    // Empty
    let score = CompanyStatisticsService.calculateCompleteness({}, null, []);
    expect(score).toBe(0);

    // Add Logo (10)
    score = CompanyStatisticsService.calculateCompleteness({ logoUrl: 'http://logo.com' }, null, []);
    expect(score).toBe(10);

    // Add Email (10)
    score = CompanyStatisticsService.calculateCompleteness({ logoUrl: 'http://logo.com', email: 'test@test.com' }, null, []);
    expect(score).toBe(20);

    // Add primary address (20)
    score = CompanyStatisticsService.calculateCompleteness(
      { logoUrl: 'http://logo.com', email: 'test@test.com' },
      null,
      [{ isPrimary: true, type: AddressType.HEAD_OFFICE }] as any
    );
    expect(score).toBe(40);

    // Add legal NIB (20) and NPWP (20)
    score = CompanyStatisticsService.calculateCompleteness(
      { logoUrl: 'http://logo.com', email: 'test@test.com' },
      { nib: '1234567890123', npwp: '123456789012345' },
      [{ isPrimary: true, type: AddressType.HEAD_OFFICE }] as any
    );
    expect(score).toBe(80);

    // Full profile (Logo, Email, Phone, Website, Address, NIB, NPWP)
    score = CompanyStatisticsService.calculateCompleteness(
      { logoUrl: 'logo', email: 'e@e.com', phone: '123', website: 'w.com' },
      { nib: '123', npwp: '123' },
      [{ isPrimary: true, type: AddressType.HEAD_OFFICE }] as any
    );
    expect(score).toBe(100);
  });
});
