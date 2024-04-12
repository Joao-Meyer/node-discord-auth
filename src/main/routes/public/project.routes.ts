import { Router } from 'express';
import {
  deleteProjectController,
  findOneProjectController,
  findProjectController,
  insertProjectController,
  updateProjectController
} from '@application/controller/project';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('', findProjectController());
  router.post('', insertProjectController());
  router.get('/:id', findOneProjectController());
  router.put('/:id', updateProjectController());
  router.delete('/:id', deleteProjectController());

  inputRouter.use('/project', router);
};
