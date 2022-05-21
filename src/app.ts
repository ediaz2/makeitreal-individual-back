import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { logger } from '@tinyhttp/logger';
import { json } from 'milliparsec';
import { files } from './middlewares/files';

import { routes } from '~/routes';

const app = new App();

// Middelwares
app.use(cors());
app.use(logger());
app.use((req, res, next) => {
  const hasMultipart = req.headers['content-type']?.includes(
    'multipart/form-data',
  );
  if (hasMultipart) {
    files(req, res, next);
  } else {
    json()(req, res, next);
  }
});

// Routes
app.use(routes);

export { app };
