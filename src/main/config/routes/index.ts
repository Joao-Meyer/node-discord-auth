/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable function-paren-newline */
import { Router } from 'express';
import { privateFiles, publicFiles } from '../../routes/files';
import { validateTokenMiddleware } from '../../middleware/validation';
import type { Express } from 'express';

export const setupRoutes = (app: Express): void => {
  const publicRouter = Router();
  const privateRouter = Router();

  Promise.all(
    publicFiles.map(async (file) => {
      const module = await import(`../../routes/public/${file}`);

      module.default(publicRouter);
    })
  ).then(() => {
    app.use(publicRouter);
  });

  Promise.all(
    privateFiles.map(async (file) => {
      const module = await import(`../../routes/private/${file}`);

      module.default(privateRouter);
    })
  ).then(() => {
    app.use(validateTokenMiddleware(), privateRouter);
  });
};
