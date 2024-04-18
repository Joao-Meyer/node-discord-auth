import { app } from './main/config/app';
import { env } from './main/config/env';

app.listen(env.API.PORT, () => {
  console.info(`Server started at http://localhost:${env.API.PORT}`);
});
