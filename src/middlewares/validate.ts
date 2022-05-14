import type { SyncHandler } from '@tinyhttp/app';
import type { ZodSchema } from 'zod';

export const validateRequest =
  (schema: ZodSchema): SyncHandler =>
  (req, res, next) => {
    const parsed = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!parsed.success) {
      const messages = parsed.error.issues.reduce(
        (acc: Record<string, string>, issue) => {
          acc[issue.path.join('.')] = issue.message;
          return acc;
        },
        {},
      );

      res.status(400);
      res.json({
        errors: messages,
      });
      return;
    }
    req.body = parsed.data.body;
    next();
  };
