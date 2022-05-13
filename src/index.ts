/* eslint-disable no-console */
import boxen from 'boxen';

import { app } from '~/app';
import { connect } from '~/config/database';
import { env } from '~/config/env';

const main = async () => {
  const dBstatus = await connect();
  app.listen(env.port, () => {
    console.log('\n');
    console.log(
      boxen(
        `PORT: ${env.port}
NODE_ENV: ${env.env}
DATA BASE: ${dBstatus}
http://localhost:${env.port}`,
        {
          title: 'STARTING FAVS API 🚀',
          titleAlignment: 'center',
          padding: 1,
          borderStyle: 'bold',
          borderColor: 'green',
        },
      ),
    );
  });
};
await main();
