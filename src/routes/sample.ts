import { App } from '@tinyhttp/app';

import { type RequestTenant, checkTenant } from '~/middlewares/checkTenant';

const router = new App();

router.use(checkTenant);
router.get('/', (req: RequestTenant, res) => {
  const { tenant } = req;
  res.send(tenant);
});

export default router;
