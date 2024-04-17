import { numberRequired } from 'main/utils';
import { yup } from 'infra/yup';

export const generateMinutesInteractionSchema = yup.object().shape({
  body: yup.object().shape({
    aiConfigId: numberRequired({
      english: 'ai config id',
      portuguese: 'id da configuração da ia'
    })
  })
});
