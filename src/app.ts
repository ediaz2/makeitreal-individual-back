import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { logger } from '@tinyhttp/logger';
import { urlencoded } from 'milliparsec';

const app = new App();

// Middelwares
app.use(cors());
app.use(logger());
app.use(urlencoded());
app.get('/', (req, res) => res.send('Hello World!'));

export { app };
