export type azureDataFields = 'blobContainer' | 'createdAt' | 'id' | 'indexName' | 'updatedAt';

export type azureDataQueryFields = 'blobContainer' | 'endDate' | 'indexName' | 'startDate';

export const azureDataListQueryFields: azureDataQueryFields[] = [
  'blobContainer',
  'indexName',
  'startDate',
  'endDate'
];
