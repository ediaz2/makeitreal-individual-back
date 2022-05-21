import { config as configEnv } from '@tinyhttp/dotenv';
import type { ConnectOptions } from 'mongoose';
import { join } from 'node:path';
import { z } from 'zod';

import { logger } from '~/config/logger';

configEnv({
  path: join(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

const envSchema = z.object({
  PORT: z
    .preprocess((n) => parseInt(n as string, 10), z.number())
    .default(4000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DOMAIN: z.string().default('localhost'),
  MONGO_URI: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const { errors } = result.error;
  errors.forEach((e) => {
    logger.error(`${e.path} [${e.message}]`, 'env');
  });
  process.exit(1);
}

const { data } = result;

export const env = {
  port: data.PORT,
  env: data.NODE_ENV,
  domain: data.DOMAIN,
  mongoose: {
    uri: data.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions,
  },
  cloudinary: {
    cloud_name: data.CLOUDINARY_CLOUD_NAME,
    api_key: data.CLOUDINARY_API_KEY,
    api_secret: data.CLOUDINARY_API_SECRET,
    secure: true,
  },
  jwt: {
    secret: data.JWT_SECRET,
    expiresIn: data.JWT_EXPIRES_IN,
  },
};
