import { Router } from 'express';
import { authenticateUserController } from '@application/controller/auth';

export default (inputRouter: Router): void => {
  const router = Router();

  // router.post('/', insertUserController());

  inputRouter.use('/user', router);
};
