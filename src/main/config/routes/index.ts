import { AuthRoutes, TestRoutes } from '../../routes/public';
import { Router } from 'express';
import { UserRoutes } from '../../routes/private';
import { validateTokenMiddleware } from '../../middleware/validation';
import type { Express } from 'express';

export const setupRoutes = (app: Express): void => {
  const publicRouter = Router();
  const privateRouter = Router();

  // publicRouter
  AuthRoutes(publicRouter);
  TestRoutes(publicRouter);

  // privateRouter
  UserRoutes(privateRouter);

  app.use(publicRouter);

  app.use(validateTokenMiddleware(), privateRouter);
};
