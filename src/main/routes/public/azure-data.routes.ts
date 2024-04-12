import { Router } from 'express';
import {
  deleteAzureDataController,
  findAzureDataController,
  findOneAzureDataController,
  insertAzureDataController,
  updateAzureDataController
} from '@application/controller/azure-data';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('', findAzureDataController());
  router.post('', insertAzureDataController());
  router.get('/:id', findOneAzureDataController());
  router.put('/:id', updateAzureDataController());
  router.delete('/:id', deleteAzureDataController());

  inputRouter.use('/azure-data', router);
};
