import { z } from 'zod';
import { SupplierStatus, SupplierCategory, SupplierBusinessType } from '@prisma/client';

export const CreateSupplierSchema = z.object({
  body: z.object({
    companyId: z.string().min(1, 'companyId is required'),
    name: z.string().min(3, 'Supplier name must be at least 3 characters long'),
    displayName: z.string().optional(),
    businessType: z.nativeEnum(SupplierBusinessType),
    category: z.nativeEnum(SupplierCategory),
    status: z.nativeEnum(SupplierStatus),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
    logoUrl: z.string().url('Invalid logo URL').optional().or(z.literal('')),
    description: z.string().optional().or(z.literal('')),
  })
});

export const UpdateSupplierSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  }),
  body: z.object({
    version: z.number(),
    name: z.string().min(3, 'Supplier name must be at least 3 characters long').optional(),
    displayName: z.string().optional(),
    businessType: z.nativeEnum(SupplierBusinessType).optional(),
    category: z.nativeEnum(SupplierCategory).optional(),
    status: z.nativeEnum(SupplierStatus).optional(),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
    logoUrl: z.string().url('Invalid logo URL').optional().or(z.literal('')),
    description: z.string().optional().or(z.literal('')),
  })
});

export const SupplierQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
    sort: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
    status: z.nativeEnum(SupplierStatus).optional(),
    companyId: z.string().optional(),
    keyword: z.string().optional(),
  })
});

export const SupplierIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  })
});

export const ContactPrimarySchema = z.object({
  params: z.object({
    id: z.string().min(1)
  }),
  body: z.object({
    contactId: z.string().min(1, 'contactId is required')
  })
});

export const BankPrimarySchema = z.object({
  params: z.object({
    id: z.string().min(1)
  }),
  body: z.object({
    bankAccountId: z.string().min(1, 'bankAccountId is required')
  })
});
