import { z } from 'zod';

import { userSchema } from './users';

export const  register= z.object({
  body: userSchema,
});

export const   login= z.object({
  body: userSchema.pick({email: true, password: true}),
});

export type AuthRegister = z.infer<typeof register>;
export type AuthLogin = z.infer<typeof login>;