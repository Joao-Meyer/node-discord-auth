export type aiModelFields = 'createdAt' | 'deploymentId' | 'id' | 'nickname' | 'updatedAt';

export type aiModelQueryFields = 'deploymentId' | 'endDate' | 'nickname' | 'startDate';

export const aiModelListQueryFields: aiModelQueryFields[] = [
  'deploymentId',
  'nickname',
  'startDate',
  'endDate'
];
