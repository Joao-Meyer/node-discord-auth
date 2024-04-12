import { Router } from 'express';
import { fileUploadToAzure } from '@application/controller/file-upload-to-blob';
import { upload } from '@main/utils/file-handler';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', upload.single('file'), fileUploadToAzure());

  inputRouter.use('/file-upload-to-azure', router);
};
