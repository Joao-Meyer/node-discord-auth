/* eslint-disable @typescript-eslint/no-misused-promises */
import { IcuController } from '../../../application/controller/icu';
import { Router } from 'express';

export const TestRoutes = (inputRouter: Router): void => {
  const router = Router();

  router.get('/', (req, res) => {
    res.json({
      message: 'Api running successfully (◡‿◡)'
    });
  });

  router.get('/favicon.ico', IcuController());

  router.get('/favicon.png', IcuController());

  inputRouter.use('/', router);
};
