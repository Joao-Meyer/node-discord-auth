import { numberNotRequired, stringNotRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateOpenAiModelSchema = yup.object().shape({
  body: yup.object().shape({
    maxTokens: numberNotRequired(),
    name: stringNotRequired()
  })
});
