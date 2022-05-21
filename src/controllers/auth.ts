import type { SyncHandler } from '@tinyhttp/app';
import * as authService from '~/services/auth';
import { errorHandler } from '~/middlewares/errors';

export const register: SyncHandler = async (req, res, next) => {
  console.log(req.subdomains)
  const { body } = req;

  const [token, error] = await authService.register(body);
  if (error) {
    errorHandler(error, req, res);
    return;
  }

  res.json(token);
};

export const login: SyncHandler = async (req, res, next) => {
  const { body } = req;

  const [token, error] = await authService.login(body);
  if (error) {
    errorHandler(error, req, res);
    return;
  }

  res.status(200);
  res.json(token);
};
