import { DataSource } from './infra/database';
import { env } from './main/config/env';
import { errorLogger } from './main/utils';

DataSource.$connect()
  .then(async () => {
    if (typeof env.API.PORT === 'string') {
      const { http } = await import('./main/config/app');

      http.listen(env.API.PORT, () => {
        console.info(`Server started at http://localhost:${env.API.PORT}`);
      });
    } else console.info('Environment variables missing');
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error(`An error of type ${error.name} occurred. See the logs error...`);
      console.error(error);
    }
    errorLogger(error);
  });