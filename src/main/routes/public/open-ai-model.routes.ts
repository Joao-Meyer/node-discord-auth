import { Router } from 'express';
import {
  deleteOpenAiModelController,
  findOneOpenAiModelController,
  findOpenAiModelController,
  insertOpenAiModelController,
  updateOpenAiModelController
} from '@application/controller/open-ai-model';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('', findOpenAiModelController());
  router.post('', insertOpenAiModelController());
  router.get('/:id', findOneOpenAiModelController());
  router.put('/:id', updateOpenAiModelController());
  router.delete('/:id', deleteOpenAiModelController());

  inputRouter.use('/open-ai-model', router);
};
