import { stringRequired } from 'main/utils';
import { yup } from 'infra/yup';

export const insertProjectSchema = yup.object().shape({
  body: yup.object().shape({
    nickname: stringRequired({
      english: 'nickname',
      portuguese: 'apelido'
    })
  })
});
