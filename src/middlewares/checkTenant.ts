import type { Request, Response } from '@tinyhttp/app';
import type { SyncHandler as RSyncHandler } from '@tinyhttp/router';

import { env } from '~/config/env';
import { isSubdomainExists } from '~/utils/domain';

export interface RequestTenant extends Request {
  tenant?: string;
}

const getTenant = (host: string): string => host.split('.')[0];

export const checkTenant: RSyncHandler<RequestTenant, Response> = (
  req,
  res,
  next,
) => {
  const host = req.get('host');
  if (!isSubdomainExists(env.domain, host as string)) {
    // TODO: Create a custom error
    res.status(400);
    res.json({ message: 'Invalid host' });
    return;
  }
  // TODO: Add check valid for mongoDB
  const tenant = getTenant(host as string);
  req.tenant = tenant;
  next();
};
