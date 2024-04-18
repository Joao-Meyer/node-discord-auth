/* eslint-disable function-paren-newline */
import { Router } from 'express';
import { join } from 'path';
import { readdirSync } from 'fs';
import { validateTokenMiddleware } from '../../middleware/validation';
import type { Express } from 'express';

export const setupRoutes = (app: Express): void => {
  const publicRouter = Router();
  const privateRouter = Router();

  readdirSync(join(__dirname, '..', '..', 'routes', 'public')).map(async (file) =>
    (await import(`../../routes/public/${file}`)).default(publicRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'private')).map(async (file) =>
    (await import(`../../routes/private/${file}`)).default(privateRouter)
  );

  app.use(publicRouter);
  app.use(validateTokenMiddleware(), privateRouter);
};
