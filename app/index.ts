import { env, setupMiddleware, setupRoutes } from '@main/config';
import cors from 'cors';
import express from 'express';

const app = express();

setupMiddleware(app);

app.use(cors());

setupRoutes(app);

app.listen(env.API.PORT, () => {
  console.info(`Server started at http://localhost:${env.API.PORT}`);
});
