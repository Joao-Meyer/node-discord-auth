import { Router } from 'express';
import {
  deleteAiConfigController,
  findAiConfigController,
  findOneAiConfigController,
  insertAiConfigController,
  updateAiConfigController
} from '@application/controller/ai-config';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('', findAiConfigController());
  router.post('', insertAiConfigController());
  router.get('/:id', findOneAiConfigController());
  router.put('/:id', updateAiConfigController());
  router.delete('/:id', deleteAiConfigController());

  inputRouter.use('/ai-config', router);
};
