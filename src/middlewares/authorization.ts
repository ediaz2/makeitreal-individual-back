import type { SyncHandler } from '@tinyhttp/app';
import jwt from 'jsonwebtoken';

import { env } from '~/config/env';
import { logger } from '~/config/logger';

export const authorization: SyncHandler = (req, res, next) => {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) throw new Error('No token provided');

    const token = authorization.split(' ')[1];
    if (!token) throw new Error('No token provided');

    jwt.verify(token, env.jwt.secret) as { id: string };

    next();
  } catch (error) {
    logger.error((error as Error).message, 'auth');
    res.statusCode = 401;
    res.json({ errors: { message: 'Invalid token' } });
  }
};