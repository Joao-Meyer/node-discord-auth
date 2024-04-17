import { numberNotRequired, numberRequired, stringNotRequired } from 'main/utils';
import { yup } from 'infra/yup';

export const updateMinutesSentSchema = yup.object().shape({
  body: yup.object().shape({
    aiConfigId: numberRequired({
      english: 'ai config',
      portuguese: 'Configuração da IA'
    }),
    nickname: stringNotRequired(),
    projectId: numberNotRequired()
  })
});
