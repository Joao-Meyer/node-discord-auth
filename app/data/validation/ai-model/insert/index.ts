import { numberRequired, stringRequired } from 'main/utils';
import { yup } from 'infra/yup';

export const insertAiModelSchema = yup.object().shape({
  body: yup.object().shape({
    deploymentId: stringRequired({
      english: 'id',
      portuguese: 'id'
    }),
    nickname: stringRequired({
      english: 'nickname',
      portuguese: 'apelido'
    }),
    openAiModelId: numberRequired({
      english: 'open ai model id',
      portuguese: 'id do modelo de ia'
    })
  })
});
