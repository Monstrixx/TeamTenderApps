import { z } from 'zod';
import { CompanyBusinessType, CompanyStatus, AddressType, CompanyVisibility, CompanyVerificationStatus } from '@prisma/client';

export const CompanyQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  keyword: z.string().optional(),
  status: z.nativeEnum(CompanyStatus).optional(),
  visibility: z.nativeEnum(CompanyVisibility).optional(),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  includeDeleted: z.enum(['true', 'false']).transform((v) => v === 'true').optional(),
});

const normalizeNpwpNib = (val: string) => val.replace(/[\.\-\s]/g, '');

const npwpValidator = z.string().transform(normalizeNpwpNib).refine((val) => /^\d{15,16}$/.test(val), {
  message: 'NPWP must be 15 or 16 numeric digits after normalization',
});

const nibValidator = z.string().transform(normalizeNpwpNib).refine((val) => /^\d{13}$/.test(val), {
  message: 'NIB must be exactly 13 numeric digits after normalization',
});

export const CreateCompanyLegalSchema = z.object({
  nib: nibValidator.optional().nullable(),
  npwp: npwpValidator.optional().nullable(),
  pkpNumber: z.string().optional().nullable(),
  deedNumber: z.string().optional().nullable(),
  deedDate: z.coerce.date().optional().nullable(),
  ministryApprovalNumber: z.string().optional().nullable(),
  ministryApprovalDate: z.coerce.date().optional().nullable(),
  taxOffice: z.string().optional().nullable(),
  businessSector: z.string().optional().nullable(),
  kbli: z.string().optional().nullable(),
  capital: z.number().optional().nullable(),
  employeeCount: z.number().int().nonnegative().optional().nullable(),
});

export const CreateCompanyAddressSchema = z.object({
  type: z.nativeEnum(AddressType),
  province: z.string().min(1),
  city: z.string().min(1),
  district: z.string().min(1),
  village: z.string().min(1),
  postalCode: z.string().regex(/^\d+$/),
  address: z.string().min(1),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isPrimary: z.boolean().default(false),
});

export const CreateCompanyContactSchema = z.object({
  fullName: z.string().min(2),
  position: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  mobilePhone: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  isPrimary: z.boolean().default(false),
});

export const CreateCompanyBankAccountSchema = z.object({
  bankName: z.string().min(2),
  bankBranch: z.string().optional().nullable(),
  accountNumber: z.string().min(4),
  accountHolder: z.string().min(2),
  swiftCode: z.string().optional().nullable(),
  currency: z.string().default('IDR'),
  isPrimary: z.boolean().default(false),
});

export const CreateCompanySchema = z.object({
  name: z.string().min(2),
  legalName: z.string().optional().nullable(),
  businessType: z.nativeEnum(CompanyBusinessType),
  status: z.nativeEnum(CompanyStatus).default(CompanyStatus.ACTIVE),
  visibility: z.nativeEnum(CompanyVisibility).default(CompanyVisibility.PRIVATE),
  verificationStatus: z.nativeEnum(CompanyVerificationStatus).default(CompanyVerificationStatus.PENDING),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  website: z.string().url().optional().nullable(),
  logoUrl: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
  establishedDate: z.coerce.date().optional().nullable(),
});

export const UpdateCompanySchema = CreateCompanySchema.partial().extend({
  version: z.number().int().positive('Version is required for optimistic locking'),
});
