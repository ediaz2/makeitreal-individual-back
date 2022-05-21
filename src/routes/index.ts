import { App } from '@tinyhttp/app';
import { checkTenant } from '~/middlewares/checkTenant';
import { authorization } from '~/middlewares/authorization';
import { validateRequest } from '~/middlewares/validate';
import * as controllerAuth from '~/controllers/auth';
import * as controllerUsers from '~/controllers/users';
import * as controllerProducts from '~/controllers/products';
import { login, register, productCreate } from '~/schemas';

const routes = new App();

// AUTH
routes.post(
  '/api/auth/register',
  validateRequest(register),
  controllerAuth.register,
);
routes.post('/api/auth/login', validateRequest(login), controllerAuth.login);

// USERS
routes.get('/api/users/:id', authorization, controllerUsers.findOne);

// PRODUCTS
routes.get('/api/products', checkTenant, controllerProducts.findByTenant);
routes.get('/api/products/:user', authorization, controllerProducts.findByUser);
routes.post('/api/products', authorization, validateRequest(productCreate), controllerProducts.create);


export { routes };
