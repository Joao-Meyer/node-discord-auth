import { Router } from 'express';
import { generateMinutesController } from '@application/controller/generate-minutes/interaction';
import { upload } from '@main/utils/file-handler';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', upload.single('file'), generateMinutesController());

  inputRouter.use('/generate-meeting-minutes', router);
};
