/* eslint-disable @typescript-eslint/no-misused-promises */
import { DataSource } from '../../../infra/database';
import { Router } from 'express';

export const TestRoutes = (inputRouter: Router): void => {
  const router = Router();

  router.get('/', (req, res) => {
    res.json({
      message: 'Api running successfully (◡‿◡)'
    });
  });

  router.get('/user', async (req, res) => {
    const response = await DataSource.user.findMany({
      select: {
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true
      }
    });

    return res.json({
      response
    });
  });

  inputRouter.use('/', router);
};
