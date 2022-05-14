import type { Response } from '@tinyhttp/app';
import { IncomingHttpHeaders } from 'node:http';
import { SpyInstanceFn, vi } from 'vitest';

import { RequestTenant } from '~/middlewares/checkTenant';

export const mockRequest = ({
  body,
  query,
  params,
  headers,
  tenant,
}: {
  body?: Record<string, any>;
  query?: Record<string, any>;
  params?: Record<string, any>;
  headers?: IncomingHttpHeaders;
  tenant?: string;
}): Partial<RequestTenant> => ({
  body,
  query,
  params,
  headers,
  tenant,
  get: (key: string) => headers![key],
});

export const mockResponse = (
  sendStatusMock?: SpyInstanceFn<any[], any>,
  sendJsonMock?: SpyInstanceFn<any[], any>,
): Partial<Response> => ({
  status: vi.fn(() => ({ send: sendStatusMock } as any)),
  json: vi.fn(() => ({ send: sendJsonMock } as any)),
});
