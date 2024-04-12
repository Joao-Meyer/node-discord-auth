import { numberRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertMinutesSentSchema = yup.object().shape({
  body: yup.object().shape({
    minuteFilePath: stringRequired({
      english: 'minute file path',
      portuguese: 'url da ata'
    }),
    nickname: stringRequired({
      english: 'nickname',
      portuguese: 'apelido'
    }),
    projectId: numberRequired({
      english: 'project id',
      portuguese: 'Id do projeto'
    }),
    transcriptionFilePath: stringRequired({
      english: 'transcription file path',
      portuguese: 'url da transcrição'
    })
  })
});
