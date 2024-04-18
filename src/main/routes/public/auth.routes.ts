import { Router } from 'express';
import { authenticateUserController } from 'application/controller/auth';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', authenticateUserController());

  inputRouter.use('/auth', router);
};
