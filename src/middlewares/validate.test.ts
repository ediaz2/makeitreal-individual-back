import type { NextFunction, Request, Response } from '@tinyhttp/app';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { validateRequest } from '~/middlewares/validate';
import { mockRequest, mockResponse } from '~/mocks';

const sendStatusMock = vi.fn();
const sendJsonMock = vi.fn();
const nextFunction: NextFunction = vi.fn();

const userSchema = z.object({
  body: z.object({ email: z.string().email() }),
});

describe('Validate middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not be accepted if the email is invalid', () => {
    const mockedResponse = mockResponse(sendStatusMock, sendJsonMock);

    validateRequest(userSchema)(
      mockRequest({ body: { email: 'mail@mail' } }) as Request,
      mockedResponse as Response,
      nextFunction,
    );

    expect(mockedResponse.status).toHaveBeenCalledWith(400);
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should only pass the fields of the "schemaValidate"', () => {
    const mockedResponse = mockResponse(sendStatusMock, sendJsonMock);
    const mockedRequest = mockRequest({
      body: { email: 'mail@mail.com', name: 'test' },
    }) as Request;

    validateRequest(userSchema)(
      mockedRequest as Request,
      mockedResponse as Response,
      nextFunction,
    );

    expect(mockedRequest.body).toEqual({ email: 'mail@mail.com' });
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should not be accepted if the body is empty', () => {
    const mockedResponse = mockResponse(sendStatusMock, sendJsonMock);
    const expectedResponse = { errors: { 'body.email': 'Required' } };

    validateRequest(userSchema)(
      mockRequest({ body: {} }) as Request,
      mockedResponse as Response,
      nextFunction,
    );

    expect(mockedResponse.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('should be accepted if the body is valid', async () => {
    validateRequest(userSchema)(
      mockRequest({
        body: { email: 'mail@mail.com' },
      }) as Request,
      mockResponse() as Response,
      nextFunction,
    );

    expect(nextFunction).toHaveBeenCalled();
  });
});
