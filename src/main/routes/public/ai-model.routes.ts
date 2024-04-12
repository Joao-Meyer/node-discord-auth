import { Router } from 'express';
import {
  deleteAiModelController,
  findAiModelController,
  findOneAiModelController,
  insertAiModelController,
  updateAiModelController
} from '@application/controller/ai-model';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('', findAiModelController());
  router.post('', insertAiModelController());
  router.get('/:id', findOneAiModelController());
  router.put('/:id', updateAiModelController());
  router.delete('/:id', deleteAiModelController());

  inputRouter.use('/ai-model', router);
};
