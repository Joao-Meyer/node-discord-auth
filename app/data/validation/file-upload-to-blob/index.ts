import { numberRequired, stringRequired } from 'main/utils';
import { yup } from 'infra/yup';

export const fileUploadToAzureSchema = yup.object().shape({
  body: yup.object().shape({
    aiConfigId: numberRequired({
      english: 'ai config id',
      portuguese: 'id da configuração da ia'
    }),
    minute: stringRequired({
      english: 'minute',
      portuguese: 'ata'
    }),
    nickname: stringRequired({
      english: 'nickname',
      portuguese: 'apelido'
    }),
    projectId: stringRequired({
      english: 'project id',
      portuguese: 'id do projeto'
    })
  })
});
