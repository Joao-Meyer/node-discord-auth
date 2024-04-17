import { numberRequired, stringRequired } from 'main/utils';
import { yup } from 'infra/yup';

export const insertOpenAiModelSchema = yup.object().shape({
  body: yup.object().shape({
    maxTokens: numberRequired({
      english: 'max tokens',
      portuguese: 'máximo de tokens'
    }),
    name: stringRequired({
      english: 'name',
      portuguese: 'nome'
    })
  })
});
