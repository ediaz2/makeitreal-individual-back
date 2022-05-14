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
  MONGO_URI: z.string(),
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
  mongoose: {
    uri: data.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions,
  },
  jwt: {
    secret: data.JWT_SECRET,
    expiresIn: data.JWT_EXPIRES_IN,
  },
};
