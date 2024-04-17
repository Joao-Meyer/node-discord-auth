import { stringNotRequired } from 'main/utils';
import { yup } from 'infra/yup';

export const updateUserSchema = yup.object().shape({
  body: yup.object().shape({
    login: stringNotRequired({
      english: 'user',
      length: 150,
      portuguese: 'usuário'
    }),
    password: stringNotRequired()
  })
});
