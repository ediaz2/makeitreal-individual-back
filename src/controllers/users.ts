import { SyncHandlerTenant } from '~/middlewares/checkTenant';
import * as userService from '~/services/users';
import { errorHandler } from '~/middlewares/errors';

export const findOne: SyncHandlerTenant = async (req, res, next) => {
  const { id } = req.params;

  const [user, error] = await userService.findOne({ _id: id });
  if (error) {
    errorHandler(error, req, res);
    return;
  }

  res.json(user);
};

export const findByTenant: SyncHandlerTenant = async (req, res, next) => {
  const { tenant } = req.params;

  const [users, error] = await userService.findOne({ tenant });
  if (error) {
    errorHandler(error, req, res);
    return;
  }

  res.json(users);
}
