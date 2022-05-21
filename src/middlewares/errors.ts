import type { ErrorHandler } from '@tinyhttp/app';
import { HttpException } from '~/errors';
import { logger } from '~/config/logger';

export const errorHandler: ErrorHandler = (err, _req, res) => {
  console.log({ err });
  if (err instanceof HttpException) {
    logger.error(err.message, err.scope);
    res.status(err.status);
    res.json({
      errors: {
        message: err.message,
      },
    });
  } else {
    logger.error(err, 'INTERNAL');
    res.status(500);
    res.json({
      errors: {
        message: 'Internal Server Error',
      },
    });
  }
};