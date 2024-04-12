import { stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const authenticateSchema = yup.object().shape({
  body: yup.object().shape({
    login: stringRequired({
      english: 'user',
      portuguese: 'usuário'
    }),
    password: stringRequired({
      english: 'password',
      portuguese: 'senha'
    })
  })
});
