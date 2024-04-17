import { numberNotRequired, stringNotRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateAiConfigSchema = yup.object().shape({
  body: yup.object().shape({
    aiModelId: numberNotRequired(),
    azureDataId: numberNotRequired(),
    defaultPrompt: stringNotRequired(),
    frequencyPenalty: numberNotRequired(),
    maxRetries: numberNotRequired(),
    nickname: stringNotRequired(),
    presencePenalty: numberNotRequired(),
    previewMessageIncluded: numberNotRequired(),
    stopSequence: numberNotRequired(),
    temperature: numberNotRequired(),
    topP: numberNotRequired()
  })
});
