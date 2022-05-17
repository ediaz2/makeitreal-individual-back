import { App } from '@tinyhttp/app';

import sample from './sample';

const routes = new App();

routes.use('/api', sample);

export { routes };
