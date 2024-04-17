import { stringNotRequired } from 'main/utils';
import { yup } from 'infra/yup';

export const updateProjectSchema = yup.object().shape({
  body: yup.object().shape({
    nickname: stringNotRequired()
  })
});
