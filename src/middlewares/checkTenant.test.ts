import type { NextFunction, Response } from '@tinyhttp/app';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type RequestTenant, checkTenant } from '~/middlewares/checkTenant';
import { mockRequest, mockResponse } from '~/mocks';

const sendStatusMock = vi.fn();
const sendJsonMock = vi.fn();
const nextFunction: NextFunction = vi.fn();

describe('checkTenant', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 400 if host is not a subdomain of domain', () => {
    const mockedResponse = mockResponse(sendStatusMock, sendJsonMock);
    checkTenant(
      mockRequest({
        headers: {
          host: 'example.com',
        },
      }) as RequestTenant,
      mockedResponse as Response,
      nextFunction,
    );

    expect(nextFunction).not.toHaveBeenCalled();
    expect(mockedResponse.status).toHaveBeenCalledWith(400);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      message: 'Invalid host',
    });
  });

  it('should call next if host is a subdomain of domain', () => {
    const mockedRequest = mockRequest({
      headers: { host: 'test.example.com' },
    });

    checkTenant(
      mockedRequest as RequestTenant,
      mockResponse() as Response,
      nextFunction,
    );

    expect(nextFunction).toHaveBeenCalled();
    expect(mockedRequest.tenant).toBe('test');
  });
});
