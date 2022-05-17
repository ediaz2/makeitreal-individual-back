import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { logger } from '@tinyhttp/logger';
import { urlencoded } from 'milliparsec';

import { routes } from '~/routes';

const app = new App();

// Middelwares
app.use(cors());
app.use(logger());
app.use(urlencoded());
app.use(routes);

export { app };
