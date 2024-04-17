export type openAiModelFields = 'createdAt' | 'id' | 'name' | 'updatedAt';

export type openAiModelQueryFields = 'endDate' | 'maxTokens' | 'name' | 'startDate';

export const openAiModelListQueryFields: openAiModelQueryFields[] = [
  'maxTokens',
  'name',
  'startDate',
  'endDate'
];
