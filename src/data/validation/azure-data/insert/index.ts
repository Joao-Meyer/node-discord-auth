import { stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertAzureDataSchema = yup.object().shape({
  body: yup.object().shape({
    blobContainer: stringRequired({
      english: 'blobContainer',
      portuguese: 'endereço do blob'
    }),
    indexName: stringRequired({
      english: 'index name',
      portuguese: 'nome do index'
    }),
    nickname: stringRequired({
      english: 'nickname',
      portuguese: 'apelido'
    })
  })
});
