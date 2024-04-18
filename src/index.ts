import { env } from './main/config/env';
import { http } from './main/config/app';

http.listen(env.API.PORT, () => {
  console.info(`Server started at http://localhost:${env.API.PORT}`);
});
