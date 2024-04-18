import { Router } from 'express';

export const UserRoutes = (inputRouter: Router): void => {
  const router = Router();

  inputRouter.use('/user', router);
};
