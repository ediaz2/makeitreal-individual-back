import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1),
  ruc: z.string().length(11),
  tenant: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

const paramsSchema = z.object({
  id: z.string().length(24, 'Invalid id'),
});

export const userCreate = z.object({
  body: userSchema,
});

export const userFindById = z.object({
  params: paramsSchema,
});

export type UserCreate = z.infer<typeof userSchema>;