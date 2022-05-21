import { formidable } from 'formidable';
import type { SyncHandler } from '@tinyhttp/app';

export const files: SyncHandler = (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400);
      res.json({
        errors: err,
      });
      return;
    }

    const _fields = Object.keys(fields).reduce(
      (acc: Record<string, string>, key: string) => {
        acc[key] = fields[key][0];
        return acc;
      },
      {},
    );

    req.body = {
      ..._fields,
      ...files,
    };
    next();
  });
};
