import { z } from 'zod';

export const createPersonnelSchema = z.object({
  body: z.object({
    companyId: z.string(),
    employeeNumber: z.string().optional(),
    nik: z.string().optional(),
    fullName: z.string().min(1, 'Full name is required'),
    birthPlace: z.string().optional(),
    birthDate: z.string().datetime().optional(),
    gender: z.enum(['MALE', 'FEMALE']).optional(),
    religion: z.enum(['ISLAM', 'CHRISTIAN', 'CATHOLIC', 'HINDU', 'BUDDHIST', 'CONFUCIAN', 'OTHER']).optional(),
    maritalStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']).optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    photo: z.string().optional(),
  })
});

export const updatePersonnelSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    version: z.number(),
    employeeNumber: z.string().optional(),
    nik: z.string().optional(),
    fullName: z.string().optional(),
    birthPlace: z.string().optional(),
    birthDate: z.string().datetime().optional(),
    gender: z.enum(['MALE', 'FEMALE']).optional(),
    religion: z.enum(['ISLAM', 'CHRISTIAN', 'CATHOLIC', 'HINDU', 'BUDDHIST', 'CONFUCIAN', 'OTHER']).optional(),
    maritalStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']).optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    photo: z.string().optional(),
  })
});
