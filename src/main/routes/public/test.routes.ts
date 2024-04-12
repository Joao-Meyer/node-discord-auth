/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import { Router } from 'express';
import { defaultFolder, pdfToText } from '@main/utils';
import { trimMessages } from '@main/utils/generic';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', (req, res) => {
    res.json({
      message: 'Api running successfully (◡‿◡)'
    });
  });

  router.get('/test', async (req, res) => {
    res.json({ boa: true });
  });

  inputRouter.use('/', router);
};
