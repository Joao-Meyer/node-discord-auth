import { Router } from 'express';
import { chatAiInteractionController } from '@application/controller/chat-ai/interaction';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', chatAiInteractionController());

  inputRouter.use('/chat', router);
};
