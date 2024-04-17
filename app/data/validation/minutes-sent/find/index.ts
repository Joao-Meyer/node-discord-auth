export type minutesSentFields = 'createdAt' | 'id' | 'nickname' | 'updatedAt';

export type minutesSentQueryFields = 'endDate' | 'nickname' | 'projectId' | 'startDate';

export const minutesSentListQueryFields: minutesSentQueryFields[] = [
  'nickname',
  'endDate',
  'projectId',
  'startDate'
];
