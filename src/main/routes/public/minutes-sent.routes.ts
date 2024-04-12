import { Router } from 'express';
import {
  deleteMinutesSentController,
  findMinutesSentController,
  findOneMinutesSentController,
  insertMinutesSentController,
  updateMinutesSentController
} from '@application/controller/minutes-sent';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('', findMinutesSentController());
  router.post('', insertMinutesSentController());
  router.get('/:id', findOneMinutesSentController());
  router.put('/:id', updateMinutesSentController());
  router.delete('/:id', deleteMinutesSentController());

  inputRouter.use('/minutes-sent', router);
};
