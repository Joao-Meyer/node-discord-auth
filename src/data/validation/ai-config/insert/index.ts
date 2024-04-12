import { numberNotRequired, numberRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertAiConfigSchema = yup.object().shape({
  body: yup.object().shape({
    aiModelId: numberRequired({
      english: 'ai Model id',
      portuguese: 'id do modelo da ia'
    }),
    azureDataId: numberNotRequired(),
    defaultPrompt: stringRequired({
      english: 'default prompt',
      portuguese: 'prompt padrão'
    }),
    frequencyPenalty: numberRequired({
      english: 'frequency penalty',
      portuguese: 'frequencia de penalidade'
    }),
    maxRetries: numberRequired({
      english: 'max retries',
      portuguese: 'máximo de tentativas'
    }),
    nickname: stringRequired({
      english: 'nickname',
      portuguese: 'apelido'
    }),
    presencePenalty: numberRequired({
      english: 'presence penalty',
      portuguese: 'frequencia de presencia'
    }),
    previewMessageIncluded: numberRequired({
      english: 'preview message included',
      portuguese: 'quantidade de mensagens incluidas'
    }),
    stopSequence: numberNotRequired(),
    temperature: numberRequired({
      english: 'temperature',
      portuguese: 'temperatura'
    }),
    topP: numberRequired({
      english: 'top P',
      portuguese: 'top P'
    })
  })
});
