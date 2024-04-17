export type projectFields = 'createdAt' | 'id' | 'nickname' | 'updatedAt';

export type projectQueryFields = 'endDate' | 'nickname' | 'startDate';

export const projectListQueryFields: projectQueryFields[] = ['nickname', 'endDate', 'startDate'];
