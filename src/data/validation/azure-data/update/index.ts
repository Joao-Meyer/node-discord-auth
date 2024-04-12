import { stringNotRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateAzureDataSchema = yup.object().shape({
  body: yup.object().shape({
    blobContainer: stringNotRequired(),
    indexName: stringNotRequired(),
    nickname: stringNotRequired()
  })
});
