import { stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertUserSchema = yup.object().shape({
  body: yup.object().shape({
    login: stringRequired({
      english: 'user',
      length: 150,
      portuguese: 'usuário'
    }),
    password: stringRequired({
      english: 'password',
      portuguese: 'senha'
    })
  })
});
