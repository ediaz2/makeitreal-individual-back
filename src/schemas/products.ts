import { z } from 'zod';
import formidable from 'formidable';

export const productSchema = z.object({
  name: z.string().min(1),
  price: z.preprocess((n) => parseInt(n as string, 10), z.number()),
  description: z.string().optional(),
  image: z.array(z.instanceof(Object)),
  user: z.string().length(24, 'Invalid id'),
});

export const productCreate = z.object({
  body: productSchema,
});

export type ProductCreate = z.infer<typeof productSchema> & {
  image: formidable.File[];
};