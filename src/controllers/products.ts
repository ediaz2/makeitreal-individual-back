import { SyncHandlerTenant } from '~/middlewares/checkTenant';
import { errorHandler } from '~/middlewares/errors';
import * as userService from '~/services/users';
import * as productService from '~/services/products';

export const create: SyncHandlerTenant = async (req, res, next) => {
  console.log(req.body);
  const [product, error] = await productService.create(req.body);
  if (error) {
    errorHandler(error, req, res);
    return;
  }

  res.json(product);
};

export const findByUser: SyncHandlerTenant = async (req, res, next) => {
  const { user } = req.params;
  const [products, error] = await productService.findByUserId(user as string);
  if (error) {
    errorHandler(error, req, res);
    return;
  }

  res.json(products);
};

export const findByTenant: SyncHandlerTenant = async (req, res, next) => {
  const { tenant } = req;

  const [user, error] = await userService.findOne({ tenant });
  if (!user) {
    errorHandler(error, req, res);
    return;
  }

  const { _id } = user;
  const [products, errorProducts] = await productService.findByUserId(_id);
  if (errorProducts) {
    errorHandler(error, req, res);
    return;
  }

  res.json(products);
};
