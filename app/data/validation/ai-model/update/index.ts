import { numberNotRequired, stringNotRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateAiModelSchema = yup.object().shape({
  body: yup.object().shape({
    deploymentId: stringNotRequired(),
    nickname: stringNotRequired(),
    openAiModelId: numberNotRequired()
  })
});
