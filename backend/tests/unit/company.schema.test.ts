import { describe, it, expect } from 'vitest';
import { CreateCompanyLegalSchema } from '../../src/schemas/company.schema';

describe('Company Schema Validation', () => {
  it('should validate 13-digit NIB', () => {
    const valid = CreateCompanyLegalSchema.parse({ nib: '1234567890123' });
    expect(valid.nib).toBe('1234567890123');

    const validWithSpaces = CreateCompanyLegalSchema.parse({ nib: '1234 5678 9012 3' });
    expect(validWithSpaces.nib).toBe('1234567890123');

    expect(() => CreateCompanyLegalSchema.parse({ nib: '123' })).toThrow('NIB must be exactly 13 numeric digits');
    expect(() => CreateCompanyLegalSchema.parse({ nib: 'abcdefghijklm' })).toThrow('NIB must be exactly 13 numeric digits');
  });

  it('should validate 15 or 16-digit NPWP', () => {
    const valid15 = CreateCompanyLegalSchema.parse({ npwp: '12.345.678.9-012.345' });
    expect(valid15.npwp).toBe('123456789012345');

    const valid16 = CreateCompanyLegalSchema.parse({ npwp: '1234567890123456' });
    expect(valid16.npwp).toBe('1234567890123456');

    expect(() => CreateCompanyLegalSchema.parse({ npwp: '123' })).toThrow('NPWP must be 15 or 16 numeric digits');
  });
});
